from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)


async def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES",30)))
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode,os.environ.get("ACCESS_TOKEN_SECRET"), algorithm=os.environ.get("JWT_ALGORITHM","HS256"))
    return encoded_jwt

# create refresh token
async def create_refresh_token(data: dict):    
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=int(os.environ.get("REFRESH_TOKEN_EXPIRE_MINUTES",60)))
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.environ.get("REFRESH_TOKEN_SECRET"), algorithm=os.environ.get("JWT_ALGORITHM","HS256"))
    return encoded_jwt