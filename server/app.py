from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from database.config import engine, database , Base
from api import user , auth , myself

app = FastAPI()
app.include_router(auth.router , prefix="/api")
app.include_router(user.router , prefix="/api")
app.include_router(myself.router , prefix="/api")


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
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)



@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()
