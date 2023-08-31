from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from auth.action import  validate_user, get_current_user
from auth.utils import create_access_token, create_refresh_token
from schemas.token import Token
from typing import Annotated
from datetime import datetime, timedelta
import os
from crud.dependencies import get_user_crud
import crud.user as user_crud
from schemas.token import Token , RefreshToken
from jose import JWTError, jwt
from crud.user import UserCRUD
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/auth" , tags=["auth"] )

@router.post("/login" , response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends() , db : UserCRUD = Depends(get_user_crud) ):
    user = await validate_user(form_data.username, form_data.password )
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

    db.update_user_login( username=form_data.username )
    expired_time = int(datetime.utcnow().timestamp()) + timedelta(minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30))).seconds
    return Token(access_token=access_token, refresh_token=refresh_token , expires_in=expired_time , token_type="Bearer" )

# refresh token
# token is from cookie

@router.post("/refresh", response_model=Token)
async def refresh(refersh_data: RefreshToken , db : UserCRUD = Depends(get_user_crud)):
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

    db.update_user_login(username)
    expired_time = int(datetime.utcnow().timestamp()) + timedelta(minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30))).seconds
    return Token(access_token=access_token, refresh_token=refresh_token ,expires_in=expired_time, token_type="Bearer")
