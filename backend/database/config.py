import os

from dotenv import load_dotenv
from databases import Database
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")

# Create engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create session
async_session = sessionmaker(
    engine, expire_on_commit=False, autocommit=False, class_=AsyncSession
)

Base = declarative_base()

database = Database(DATABASE_URL)
