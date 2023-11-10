from datetime import date

from pydantic import BaseModel

# User Schema


class Base(BaseModel):
    username: str
    birthday: date


class Register(Base):
    password: str


class Password(BaseModel):
    password: str


class Birthday(BaseModel):
    birthday: date
