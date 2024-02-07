# FastAPI Vue OAuth2 Boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DB : postgresql](https://img.shields.io/badge/DB-postgresql-blue.svg)](https://www.postgresql.org/)
[![Backend : FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue.svg)](https://fastapi.tiangolo.com/)
[![Frontend : Vue](https://img.shields.io/badge/Frontend-Vue-green.svg)](https://v3.vuejs.org/)

<img src="https://raw.githubusercontent.com/jason810496/FastAPI-Vue-OAuth2/develop/docs/banner.png" alt="banner" />

[中文說明](https://github.com/jason810496/FastAPI-Vue-OAuth2/blob/main/docs/README_zh.md)

This boilerplate is a starting point for building a `FastAPI` backend using `PostgreSQL` with a `Vue3` frontend. <br>
It includes OAuth2 authentication with JWT tokens, and a simple user CRUD.<br>
Supports development with `docker-compose` and deployment with `kubernetes`.<br>

**Jump to :**
- [Project Structure & Details](#project-structure--details)
- [Environment Variables](#environment-variables)
- [Development: Local Setup](#development-local-setup)
- [Development: Docker Compose](#development-docker-compose)
- [Kubernetes 🐳](#kubernetes)

## Demo : Docker Compose
`localhost` for frontend <br>
`localhost:5001/docs` for backend swagger docs

<a href="https://www.youtube.com/watch?v=EOnzjuOir7o&ab_channel=ZhuDev" target="_blank">
 <img src="https://raw.githubusercontent.com/jason810496/FastAPI-Vue-OAuth2/main/docs/demo.png" alt="demo" height="300" />
</a>

Click image to watch demo video on YouTube ☝️

## Demo : Kubernetes
`fastapi-vue-oauth2.com` for frontend <br>
`api.oauth2-fastapi-vue.com/api/docs` for backend swagger docs

<a href="https://www.youtube.com/watch?v=3z3z3z3z3z3&ab_channel=ZhuDev" target="_blank">
 <img src="https://raw.githubusercontent.com/jason810496/FastAPI-Vue-OAuth2/main/docs/demo_k8s.png" alt="demo_k8s" height="300" />
</a>


## Features
- FastAPI backend with PostgreSQL database
- SQLAlchemy CRUD with async support
- Simple User CRUD
- OAuth2 authentication with JWT tokens
- Store refresh token in `httpOnly` cookie, access token in memory ( Pinia store )
- Vue3 frontend with Pinia store using [`Data Provider Pattern`](https://www.patterns.dev/vue/data-provider)
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
- volume `postgres_data` for persistent data ( if using `docker-compose` )

### Frontend
- `yarn`  package manager
- `Vite`  Frontend build tool
-  `/views`  Frontend page views
    - use `RefreshView.vue` as middleware to refresh JWT tokens
-  `/store`  Pinia store
-  `/router`  Vue router
- `/api`  API endpoints
    - `req.js` 
        - `axios` request wrapper , handle `401` unauthorized error to refresh JWT tokens
        - use `import.meta.env.VITE_APP_API_URL` to load API url from `.env` file

## Environment Variables

### Database Environment Variables
- `.env`  for postgres database ( using `docker-compose` )
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_DB`
### Backend Environment Variables
- `backend/.env` for backend
    - `PORT`
    - `RELOAD`
    - `DATABASE_URL`
        - Format : `DB_KIND+DRIVER://USER_NAME:PASSWORD@HOST:PORT/DATABASE_NAME` ( check [sqlalchemy database url](https://docs.sqlalchemy.org/en/20/core/engines.html) for more details )
        - **Note** :credentials should be **same as** above database `.env` file if using `docker compose`
    - `JWT_ALGORITHM`
    - `ACCESS_TOKEN_SECRET`
    - `REFRESH_TOKEN_SECRET`
    - `ACCESS_TOKEN_EXPIRE_MINUTES`
    - `REFRESH_TOKEN_EXPIRE_MINUTES`
### Frontend Environment Variables
- `frontend/.env`  for development API url
- `frontend/.env.production`  for production API url ( using `docker compose` )
- `frontend/.env.k8s`  for kubernetes API url
- `nginx/nginx.conf`  for nginx server 
    - **Note :** backend hostname should be same as `docker-compose.yml` service name
- `nginx/nginx.k8s.conf`  for kubernetes nginx server
    - **Note :** for kubernetes, we don't need to handle backend , as we use `Ingress` to route traffic
    
## Development: Local Setup
- Database ( using `docker` )
```
docker run --name fastapi_vue_oauth2_postgresql -e POSTGRES_USER=fastapi_vue_user -e POSTGRES_PASSWORD=fastapi_vue_password -e POSTGRES_DB=fastapi_vue_dev -p 5432:5432 -d -v postgres_data_dev:/var/lib/postgresql/data postgres:15.1 
```
- Backend
    > **Recommended :** Use `poetry` or `venv` for virtual environment management
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

## Development: Docker Compose

- start all services : 
    - `docker-compose up -d --build`
- stop all services : 
    - `docker-compose down`
- Services settings :
    - `docker-compose.yml`
    - Database settings : 
        - `.env` file
    - Backend settings :
        - `backend/.env` file
    - Frontend settings :
        - `frontend/.env.production` file
    - Nginx settings :
        - `nginx/nginx.conf` file
> check [Environment Variables](#environment-variables) section for more details


## Kubernetes

### Prerequisites

- `minikube`
- `kubectl`

### Minikube Setup

> `Makefile` is provided for quick setup
> ```bash
> make all
> ```

- minikube setup
```bash 
minikube start
minikube addons enable ingress
minikube addons enable ingress-dns
```

- namespace & secrets
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secrets.yaml
```

- Postgres 
```bash
kubectl apply -f k8s/database/statefulset.yaml
kubectl apply -f k8s/database/service.yaml
```

- Backend
```bash
kubectl apply -f k8s/backend/deployment.yaml
kubectl apply -f k8s/backend/hpa.yaml
kubectl apply -f k8s/backend/service.yaml
```

- Frontend
```bash
kubectl apply -f k8s/frontend/deployment.yaml
kubectl apply -f k8s/frontend/service.yaml
```

- Ingress
```bash
kubectl apply -f k8s/ingress.yaml
```

- Local DNS
```bash
# add our domain to /etc/hosts
echo "127.0.0.1 fastapi-vue-oauth2.local" | sudo tee -a /etc/hosts
```

- Start minikube tunnel
```bash
sudo minikube tunnel --cleanup
```
> `--cleanup` flag will clean up the tunnel before starting a new one. <br>

- miniube dashboard
```bash
minikube dashboard
```

- Access application using local DNS
    - https://api.oauth2-fastapi-vue.com/api/docs : `FastAPI` swagger
    - https://oauth2-fastapi-vue.com : frontend
    > However, accessing the application from browser will show not secure warning, as we haven't setup TSL yet. <br>
    > Certificate will show as `Kubernetes Ingress Controller Fake Certificate` <br>
    > It will be fixed in next step.
> **Note :** <br>
> `minikube tunnel` should be open while accessing the application using local DNS ! <br>

> Trubleshooting : <br>
> https://stackoverflow.com/questions/58561682/minikube-with-ingress-example-not-working#answer-73735009

### Minikube TSL setup

- Install `cert-manager`
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.1/cert-manager.yaml
```

- Create Self-Signed Cert Issuer
```bash
kubectl apply -f k8s/cert-issuer.yaml
```

- Update ingress
```bash
kubectl apply -f k8s/ingress-tls.yaml
```

- Trust the self-signed certificate
1. Export `.cer` file from browser ( Click on lock icon -> Certificate -> Export )
2. Click on the `.cer` file and trust the certificate
3. Open application on new tab , it should show secure connection 🔐 !


> reference : 
> - https://magda.io/docs/how-to-setup-https-to-local-cluster.html
> - https://minikube.sigs.k8s.io/docs/tutorials/custom_cert_ingress/

## Issues & PR
Feel free to open an issue !

Pull requests are welcome. <br>
Any contributions you make are **greatly appreciated**.

