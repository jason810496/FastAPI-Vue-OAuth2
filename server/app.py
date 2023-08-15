from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from models.database import engine, database , metadata , Base
from api import user

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

methods= [
    "DELETE",
    "GET",
    "POST",
    "PUT",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(user.router , prefix="/api")