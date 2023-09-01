from datetime import datetime
import os

from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from typing import Annotated

from database.config import async_session
from crud.user import UserCRUD
from .utils import verify_password, oauth2_scheme


load_dotenv()

async def validate_user(username: str, password: str ):
    async with async_session() as session:
        async with session.begin():
            db = UserCRUD(session)
            user = await db.get_user_by_username(username=username)
            if not user:
                return False

            if not verify_password(password, user.password):
                return False
            return user


async def get_current_user(token: Annotated[ str , Depends(oauth2_scheme) ]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, os.environ.get("ACCESS_TOKEN_SECRET"), algorithms=[os.environ.get("JWT_ALGORITHM","HS256")])
        username: str = payload.get("username")
        # timeout
        if datetime.utcnow() > datetime.fromtimestamp(payload.get("exp")):
            raise credentials_exception
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    async with async_session() as session:
        async with session.begin():
            db =  UserCRUD(session)
            user = await db.get_user_by_username(username=username)
            if user is None:
                raise credentials_exception
            return user


