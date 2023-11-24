import os
from functools import lru_cache


class Settings:
    app_name: str = "FastAPI Vue3 OAuth2"
    author: str = "Jason Liu"

    database_url: str = os.getenv("DATABASE_URL")

    access_token_secret: str = os.getenv("ACCESS_TOKEN_SECRET")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

    refresh_token_secret: str = os.getenv("REFRESH_TOKEN_SECRET")
    refresh_token_expire_minutes: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES"))


@lru_cache()
def get_settings():
    return Settings()
