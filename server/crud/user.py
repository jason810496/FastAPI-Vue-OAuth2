from sqlalchemy.orm import Session
from datetime import datetime

from models.database import SessionLocal
from models.user import UserModels
import schemas.user as user_schema
from typing import List
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_username(username: str):
    db = SessionLocal()
    return db.query(UserModels).filter(UserModels.username == username).first()

def get_users():
    # db = SessionLocal()
    # result = []
    # for user in db.query(UserModels).all():
    #     result.append(UserBase(username=user.username, birthday=user.birthday))
    # return result
    db = SessionLocal()
    return db.query(UserModels).all()

def create_user(user: user_schema.Register):
    db = SessionLocal()
    db_user = UserModels(username=user.username, password=get_password_hash(user.password), birthday=user.birthday )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_login(username: str):
    db = SessionLocal()
    db_user = db.query(UserModels).filter(UserModels.username == username).first()
    db_user.last_login = datetime.utcnow()
    db.commit()
    db.refresh(db_user)
    return db_user

def update_birthday(username : str , birthday : datetime):
    db = SessionLocal()
    db_user = db.query(UserModels).filter(UserModels.username == username).first()
    db_user.birthday = birthday
    db.commit()
    db.refresh(db_user)
    return db_user

def update_password(username: str , password: str ):
    db = SessionLocal()
    db_user = db.query(UserModels).filter(UserModels.username == username).first()
    db_user.password = get_password_hash(password)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(username: str):
    db = SessionLocal()
    db_user = db.query(UserModels).filter(UserModels.username == username).first()
    db.delete(db_user)
    db.commit()
    return db_user

def get_user_list():
    db = SessionLocal()
    db_user = db.query(UserModels).all()
    print("db_user_list: ", db_user)
    return db_user