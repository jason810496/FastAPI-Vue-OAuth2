from datetime import datetime, timedelta
import os
from typing import Union, Annotated

from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import APIRouter, Depends, HTTPException, status, Cookie, Response
from fastapi.security import OAuth2PasswordRequestForm

from auth.action import validate_user
from auth.utils import create_access_token, create_refresh_token
from crud.dependencies import get_user_crud
from crud.user import UserCRUD
from schemas.token import Token


load_dotenv()

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: UserCRUD = Depends(get_user_crud),
):
    user = await validate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = await create_access_token(data={"username": form_data.username})
    refresh_token = await create_refresh_token(data={"username": form_data.username})

    await db.update_user_login(username=form_data.username)
    expired_time = (
        int(datetime.utcnow().timestamp())
        + timedelta(
            minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
        ).seconds
    )

    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        samesite="strict",
        secure=True,
        expires=timedelta(int(os.environ.get("REFRESH_TOKEN_EXPIRE_MINUTES", 30))),
    )

    return Token(
        access_token=access_token,
        expires_in=expired_time,
        token_type="Bearer",
    )


@router.post("/refresh", response_model=Token)
async def refresh(
    response: Response,
    refresh_data: Annotated[Union[str, None], Cookie()] = None,
    db: UserCRUD = Depends(get_user_crud),
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("refresh_data", refresh_data)
        payload = jwt.decode(
            refresh_data,
            os.environ.get("REFRESH_TOKEN_SECRET"),
            algorithms=[os.environ.get("JWT_ALGORITHM", "HS256")],
        )
        username: str = payload.get("username")
        # timeout
        if datetime.utcnow() > datetime.fromtimestamp(payload.get("exp")):
            raise credentials_exception
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    access_token = await create_access_token(data={"username": username})
    refresh_token = await create_refresh_token(data={"username": username})

    db.update_user_login(username)
    expired_time = (
        int(datetime.utcnow().timestamp())
        + timedelta(
            minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
        ).seconds
    )

    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        samesite="strict",
        secure=True,
        expires=timedelta(int(os.environ.get("REFRESH_TOKEN_EXPIRE_MINUTES", 30))),
    )

    return Token(
        access_token=access_token,
        expires_in=expired_time,
        token_type="Bearer",
    )
