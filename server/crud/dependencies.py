from typing import Generator
from crud.user import UserCRUD
from database.config import async_session


async def get_db() -> Generator :
    async with async_session() as session:
        async with session.begin():
            yield session

async def get_user_crud() -> Generator :
    async with async_session() as session:
        async with session.begin():
            yield UserCRUD(session)