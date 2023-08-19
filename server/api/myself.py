from fastapi import APIRouter, Depends
from auth.action import get_current_user
import schemas.user as user_schema

router = APIRouter(prefix="/myself")

@router.get("" , response_model=user_schema.Base )
async def protected( current_user : user_schema.Base = Depends(get_current_user) ):
    return current_user