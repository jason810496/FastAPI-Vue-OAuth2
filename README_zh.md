# FastAPI Vue OAuth2 Boilerplate
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DB : postgresql](https://img.shields.io/badge/DB-postgresql-blue.svg)](https://www.postgresql.org/)
[![Backend : FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue.svg)](https://fastapi.tiangolo.com/)
[![Frontend : Vue](https://img.shields.io/badge/Frontend-Vue-green.svg)](https://v3.vuejs.org/)

[English description](https://github.com/jason810496/FastAPI-Vue-OAuth2/blob/main/README.md)

這個模板是一個使用 FastAPI 與 PostgreSQL 的後端，以及 Vue 前端的起始點。 <br>
包含 OAuth2 認證與 JWT tokens，以及簡單的使用者 CRUD。


## 功能
- FastAPI 後端與 PostgreSQL 資料庫
- SQLAlchemy CRUD 支援 async
- 簡單的使用者 CRUD
- OAuth2 認證與 JWT tokens
- Vue3 前端與 Vuex store
- Docker Compose 開發與正式環境


## 專案結構與細節
### 後端
- `app.py`  FastAPI 進入點
- `/api`  API endpoints
- `/auth`
    - OAuth2 認證 
    - `get_current_user` 依賴
- `/crud`
    - 使用者相關 CRUD 
    - 資料庫 session 依賴
- `/database`  資料庫設定檔案
- `/models`  SQLAlchemy models ，使用 `declarative_base`
- `/schemas`  Pydantic schemas

### 資料庫
- `PostgreSQL 15.1`  Docker Hub 的 image
- 開放在 `5432` port
- 設定 `postgres_data` volume 做資料持久化

### 前端
- `Vite`  前端建置工具
-  `/views`  前端頁面
    - 使用 `RefreshView.vue` 作為 middleware 來刷新 JWT tokens
-  `/store` Vuex store
    - `/modules` Vuex modules ，包含 `auth.js` 與 `user.js`
-  `/router` Vue router
- `/api` API endpoints
    - `req.js`
        - `axios` 請求攔截器 ，處理 `401` 未授權錯誤來刷新 JWT tokens
        - 使用 `import.meta.env.VITE_APP_API_URL` 從 `.env` 檔案載入 API url

## 環境變數
- `.env`  資料庫設定
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_DB`
- `backend/.env`  後端設定
    - `DATABASE_URL` **要與上面的 .env 設定為一樣**
    - `JWT_ALGORITHM`
    - `ACCESS_TOKEN_SECRET`
    - `REFRESH_TOKEN_SECRET`
    - `ACCESS_TOKEN_EXPIRE_MINUTES`
    - `REFRESH_TOKEN_EXPIRE_MINUTES`
- `nginx/nginx.conf`  nginx server 設定
    - **注意 :** 後端的 hostname 要與 `docker-compose.yml` 的 service name 一樣
- `frontend/.env`  開發環境 API url
- `frontend/.env.production` 正式環境 API url

## 部署

### 容器化
- `docker-compose.yml`  Docker Compose 設定檔案
- `Dockerfile`  前端 nginx server 的 Dockerfile ，使用 production build
- `backend/Dockerfile`  後端的 Dockerfile ，有提供 hot reload

### 正式環境
- `docker-compose up -d --build`

### 開發環境
- 資料庫
```
docker run --name postgres -e POSTGRES_PASSWORD=hello_fastapi -e POSTGRES_USER=hello_fastapi -e POSTGRES_DB=hello_fastapi_dev -p 5432:5432 -d postgres:15.1
```
- 後端
    <br>
    **注意** : 需要在 `backend/.env` 中把 `DATABASE_URL` 換成 `DEV_DATABASE_URL`  <br>
    ( 將  hostname 從 `db` 改為 `localhost` )
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
    - 前端
    ```
    cd frontend

    yarn dev
    ```

## 貢獻 & 問題
有任何問題歡迎開 issue !

歡迎發送 pull requests 。
任何貢獻都很感謝。