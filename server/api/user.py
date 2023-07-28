from fastapi import APIRouter, HTTPException, Depends , status , Cookie
from auth.auth import oauth2_scheme, create_access_token, validate_user, get_current_user , create_refresh_token
from schemas.token import Token
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional , Annotated , List
from datetime import datetime, timedelta , date
import os
from sqlalchemy.orm import Session
from models.database import get_db
import crud.user as user_crud
import schemas.user as user_schema
import schemas.token as token_schema
from jose import JWTError, jwt

router = APIRouter()

@router.post("/login" , response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends() ] ):
    user = await validate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = await create_access_token(
        data={"username": form_data.username}
    )
    refresh_token = await create_refresh_token(
        data={"username": form_data.username}
    )

    user_crud.update_user_login(form_data.username)
    return Token(access_token=access_token, refresh_token=refresh_token , token_type="Bearer" , expires_in=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30)))

# refresh token
# token is from cookie

@router.post("/refresh")
async def refresh(token: Annotated[str ,Cookie()] = None):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, os.environ.get("REFRESH_TOKEN_SECRET"), algorithms=[os.environ.get("JWT_ALGORITHM","HS256")])
        username: str = payload.get("username")
        # timeout
        if datetime.utcnow() > datetime.fromtimestamp(payload.get("exp")):
            raise credentials_exception
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    access_token = await create_access_token(
        data={"username": username}
    )
    refresh_token = await create_refresh_token(
        data={"username": username}
    )

    user_crud.update_user_login(username)
    return Token(access_token=access_token, refresh_token=refresh_token ,expires_in=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30)), token_type="Bearer")


@router.post("/user")
async def register(new_user: user_schema.Register ):
    db_user = user_crud.get_user_by_username(new_user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user_crud.create_user(new_user)
    return status.HTTP_201_CREATED

@router.get("/user",response_model=List[user_schema.Base])
async def get_users():
    return user_crud.get_users()
    

@router.get("/user/{username}" , response_model=user_schema.Base)
async def get_user_by_username(username : str ):
    db_user = user_crud.get_user_by_username(username=username)

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/user")
async def delete_user( current_user : user_schema.Base = Depends(get_current_user) ):
    return user_crud.delete_user(current_user.username)

@router.put("/user/password" )
async def update_password( request : user_schema.Password , current_user : user_schema.Base = Depends(get_current_user) ):
    return user_crud.update_password( current_user.username , password=request.password )

@router.put("/user/birthday" )
async def update_birthday( request : user_schema.Birthday  , current_user : user_schema.Base = Depends(get_current_user)):
    return user_crud.update_birthday( username=current_user.username ,birthday=request.birthday )

@router.get("/whoami" , response_model=user_schema.Base )
async def protected( current_user : user_schema.Base = Depends(get_current_user) ):
    return current_user
