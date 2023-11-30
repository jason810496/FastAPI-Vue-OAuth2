# FastAPI Vue OAuth2 Boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DB : postgresql](https://img.shields.io/badge/DB-postgresql-blue.svg)](https://www.postgresql.org/)
[![Backend : FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue.svg)](https://fastapi.tiangolo.com/)
[![Frontend : Vue](https://img.shields.io/badge/Frontend-Vue-green.svg)](https://v3.vuejs.org/)

<img src="https://raw.githubusercontent.com/jason810496/FastAPI-Vue-OAuth2/develop/docs/banner.png" alt="banner" />

[中文說明](https://github.com/jason810496/FastAPI-Vue-OAuth2/blob/main/docs/README_zh.md)

This boilerplate is a starting point for building a FastAPI backend using PostgreSQL with a Vue3 frontend. <br>
It includes OAuth2 authentication with JWT tokens, and a simple user CRUD.

> **Note :** For `Vue: Option API` + `VueX` version, please check out [archived-2023-11-22](https://github.com/jason810496/FastAPI-Vue-OAuth2/tree/archived-2023-11-22) branch

## Demo
`localhost` for frontend <br>
`localhost:5001/docs` for backend swagger docs

<a href="https://www.youtube.com/watch?v=EOnzjuOir7o&ab_channel=ZhuDev" target="_blank">
 <img src="https://raw.githubusercontent.com/jason810496/FastAPI-Vue-OAuth2/main/docs/demo.png" alt="demo" height="300" />
</a>

Click image to watch demo video on YouTube ☝️


## Features
- FastAPI backend with PostgreSQL database
- SQLAlchemy CRUD with async support
- Simple User CRUD
- OAuth2 authentication with JWT tokens
- Store refresh token in `httpOnly` cookie, access token in memory ( Pinia store )
- Vue3 frontend with Pinia store
- Docker Compose for development and production

## Project Structure & Details
### Backend
- `app.py`  FastAPI application files
- `/api`  API endpoints
- `/auth`
    - OAuth2 authentication 
    - `get_current_user` dependency
- `/crud`
    - user related CRUD utilities
    - database session dependency
- `/database`  Database configuration files 
- `/models`  SQLAlchemy models using `declarative_base`
- `/schemas`  Pydantic schemas

### Database
- `PostgreSQL 15.1` image from Docker Hub
- exposed on port `5432`
- volume `postgres_data` for persistent data

### Frontend
- `Vite`  Frontend build tool
-  `/views`  Frontend page views
    - use `RefreshView.vue` as middleware to refresh JWT tokens
-  `/store`  Pinia store ( using `Data Provider Patten` )
-  `/router`  Vue router
- `/api`  API endpoints
    - `req.js` 
        - `axios` request wrapper , handle `401` unauthorized error to refresh JWT tokens
        - use `import.meta.env.VITE_APP_API_URL` to load API url from `.env` file

## Environment Variables
- `.env`  for postgres database
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_DB`
- `backend/.env`  for backend
    - `PORT`
    - `RELOAD`
    - `DATABASE_URL`  **Should be same as above setting dot file**
    - `JWT_ALGORITHM`
    - `ACCESS_TOKEN_SECRET`
    - `REFRESH_TOKEN_SECRET`
    - `ACCESS_TOKEN_EXPIRE_MINUTES`
    - `REFRESH_TOKEN_EXPIRE_MINUTES`

- `nginx/nginx.conf`  for nginx server
    - **Note :** backend hostname should be same as `docker-compose.yml` service name
- `frontend/.env`  for development API url
- `frontend/.env.production`  for production API url
    

## Deployment

### Containerization
- `docker-compose.yml`  Docker Compose configuration file
- `Dockerfile`  Dockerfile for frontend nginx server with production build
- `backend/Dockerfile`  Dockerfile for backend with hot reload

### Production
- `docker-compose up -d --build`

## Development
- Database
```
docker run --name fastapi_vue_oauth2_postgresql -e POSTGRES_USER=fastapi_vue_user -e POSTGRES_PASSWORD=fastapi_vue_password -e POSTGRES_DB=fastapi_vue_dev -p 5432:5432 -d -v postgres_data_dev:/var/lib/postgresql/data postgres:15.1 
```
- Backend
    <br>
    **Note** : shuold change in change `DATABASE_URL` to `DEV_DATABASE_URL` in `backend/.env` <br>
    - Poetry
    ```
    cd backend

    poetry install
    poetry shell
    
    python3 run.py
    ```
    - Create virtual environment
    ```
    cd backend

    python3 -m venv venv
    source venv/bin/activate
    pip3 install -r requirements.txt

    python3 run.py
    ```
    - Frontend
    ```
    cd frontend

    yarn dev
    ```

### Advanced : Kubernetes

```
Still working on it on features/k8s branch !
```

## Issues & PR
Feel free to open an issue !

Pull requests are welcome. <br>
Any contributions you make are **greatly appreciated**.

