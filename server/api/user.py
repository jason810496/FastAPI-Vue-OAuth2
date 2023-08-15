from fastapi import APIRouter, HTTPException, Depends , status , Cookie
from auth.auth import oauth2_scheme, create_access_token, validate_user, get_current_user , create_refresh_token
from schemas.token import Token  , RefreshToken
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

@router.post("/auth/login" , response_model=Token)
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
    expired_time = int(datetime.utcnow().timestamp()) + timedelta(minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30))).seconds
    return Token(access_token=access_token, refresh_token=refresh_token , expires_in=expired_time , token_type="Bearer" )

# refresh token
# token is from cookie

@router.post("/auth/refresh", response_model=Token)
async def refresh(refersh_data: RefreshToken):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(refersh_data.refresh_token, os.environ.get("REFRESH_TOKEN_SECRET"), algorithms=[os.environ.get("JWT_ALGORITHM","HS256")])
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
    expired_time = int(datetime.utcnow().timestamp()) + timedelta(minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30))).seconds
    return Token(access_token=access_token, refresh_token=refresh_token ,expires_in=expired_time, token_type="Bearer")


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

@router.get("/myself" , response_model=user_schema.Base )
async def protected( current_user : user_schema.Base = Depends(get_current_user) ):
    return current_user
