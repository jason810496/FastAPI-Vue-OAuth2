# Backend homework requirement 

1. Use docker to start PostgreSQL database
2. Using poetry as Python virtual environment
 - `venv` is also accepted 
3. Build up database using alembic migration
    - SQLAlchemy
    - i. username(varchar), primary key
    - ii. password(varchar), not nullable
    - iii. birthday(date)
    - iv. create_time(datetime), default: datetime.utcnow()
    - v. last_login(datetime), nullable
4. Build up a backend server by FastAPI
    - FastAPI
        - frontend API 
        - JWT authentication
        - `user` table CRUD
5. Build up a frontend server to query backend server and display it
    - target : 
        - frontend server to interact with backend 
        - edit user data
    - operation : 
        - login 
        - CRUD user data 
            - password & birthday are both editable 
        - update : 
            - update password 
            - update birthday 
        - logout 

6. Hint 
    - Restful 
    - backend > frontend 
    - backend API Unit test

---

docker run --name postgres -e POSTGRES_PASSWORD=hello_fastapi -e POSTGRES_USER=hello_fastapi -e POSTGRES_DB=hello_fastapi_dev -p 5432:5432 -d postgres