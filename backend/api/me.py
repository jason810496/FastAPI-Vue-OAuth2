from fastapi import APIRouter, Depends

from auth.action import get_current_user
from crud.user import UserCRUD
from crud.dependencies import get_user_crud
import schemas.user as user_schema

router = APIRouter(prefix="/me", tags=["me"])


@router.delete("")
async def delete_user(
    current_user: user_schema.Base = Depends(get_current_user),
    db: UserCRUD = Depends(get_user_crud),
):
    return await db.delete_user(username=current_user.username)


@router.put("/password")
async def update_password(
    request: user_schema.Password,
    current_user: user_schema.Base = Depends(get_current_user),
    db: UserCRUD = Depends(get_user_crud),
):
    return await db.update_password(
        username=current_user.username, password=request.password
    )


@router.put("/birthday")
async def update_birthday(
    request: user_schema.Birthday,
    current_user: user_schema.Base = Depends(get_current_user),
    db: UserCRUD = Depends(get_user_crud),
):
    return await db.update_birthday(
        username=current_user.username, birthday=request.birthday
    )


@router.get("", response_model=user_schema.Base)
async def protected(current_user: user_schema.Base = Depends(get_current_user)):
    return current_user
