# FastAPI Vue OAuth2 Boilerplate
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DB : postgresql](https://img.shields.io/badge/DB-postgresql-blue.svg)](https://www.postgresql.org/)
[![Backend : FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue.svg)](https://fastapi.tiangolo.com/)
[![Frontend : Vue](https://img.shields.io/badge/Frontend-Vue-green.svg)](https://v3.vuejs.org/)

[中文說明](https://github.com/jason810496/FastAPI-Vue-OAuth2/blob/main/README_zh.md)

This boilerplate is a starting point for building a FastAPI backend using PostgreSQL with a Vue frontend. It includes OAuth2 authentication with JWT tokens, and a simple user CRUD.

## Features
- FastAPI backend with PostgreSQL database
- SQLAlchemy CRUD with async support
- Simple User CRUD
- OAuth2 authentication with JWT tokens
- Vue3 frontend with Vuex store
- Docker Compose for development and production

## Project Structure & Details
### Backend
- `app.py` : FastAPI application files
- `/api` : API endpoints
- `/auth`
    - OAuth2 authentication 
    - `get_current_user` dependency
- `/crud`
    - user related CRUD utilities
    - database session dependency
- `/database` : Database configuration files 
- `/models` : SQLAlchemy models using `declarative_base`
- `/schemas` : Pydantic schemas

### Database
- `PostgreSQL 15.1` image from [Docker Hub](https://hub.docker.com/_/postgres)
- exposed on port `5432`
- volume `postgres_data` for persistent data

### Frontend
- `Vite` : frontend build tool
-  `/views` : frontend page views
    - use `RefreshView.vue` as middleware to refresh JWT tokens
-  `/store` - Vuex store
    - `/modules` Vuex modules with `auth.js` and `user.js`
-  `/router` - Vue router
- `/api` - API endpoints
    - `req.js` : axios request wrapper , handle `401` unauthorized error to refresh JWT tokens
    - use `import.meta.env.VITE_APP_API_URL` to load API url from `.env` file

## Environment Variables
- `.env` : for postgres database
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_DB`
- `backend/.env` : for backend
    - `DATABASE_URL` : **Should be same as above setting dot file**
    - `JWT_ALGORITHM`
    - `ACCESS_TOKEN_SECRET`
    - `REFRESH_TOKEN_SECRET`
    - `ACCESS_TOKEN_EXPIRE_MINUTES`
    - `REFRESH_TOKEN_EXPIRE_MINUTES`

- `nginx/nginx.conf` : for nginx server
    - **Note :** backend hostname should be same as `docker-compose.yml` service name
- `frontend/.env` : for development API url
- `frontend/.env.production` : for production API url
    

## Deployment

### Containerization
- `docker-compose.yml` : Docker Compose configuration file
- `Dockerfile` : Dockerfile for frontend nginx server with production build
- `backend/Dockerfile` : Dockerfile for backend with hot reload

### Production
- `docker-compose up -d --build`

## Development
- Database
```
docker run --name postgres -e POSTGRES_PASSWORD=hello_fastapi -e POSTGRES_USER=hello_fastapi -e POSTGRES_DB=hello_fastapi_dev -p 5432:5432 -d postgres:15.1
```
- Backend
    <br>
    **Note** : shuold change in change `DATABASE_URL` to `DEV_DATABASE_URL` in `backend/.env`
    - Poetry
    ```
    cd backend

    poetry install
    poetry shell
    uvicorn app:app uvicorn app:app --reload --host 0.0.0.0 --port 5001
    ```
    - Create virtual environment
    ```
    cd backend

    python3 -m venv venv
    source venv/bin/activate
    pip3 install -r requirements.txt

    python3 -m uvicorn app:app --reload --host 0.0.0.0 --port 5001
    ```
- Frontend
```
cd frontend

yarn dev
```
