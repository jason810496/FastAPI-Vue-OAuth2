from typing import Optional
from pydantic import BaseModel
from datetime import datetime , date

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