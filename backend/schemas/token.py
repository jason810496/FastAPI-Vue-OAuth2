from pydantic import BaseModel

# `refresh_token` should be stored in HttpOnly cookie


class Token(BaseModel):
    access_token: str
    expires_in: int
    token_type: str
    # refresh_token: str


# class RefreshToken(BaseModel):
#     refresh_token: str
