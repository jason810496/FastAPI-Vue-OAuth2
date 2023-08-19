FROM node:lts-alpine as build-stage

# 建置 dist/
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./client/ .
RUN yarn install
RUN yarn build


# Stage-B: 
# 使用 NGINX image
FROM nginx:stable-alpine as production-stage

# 從 Stage-A COPY 過的內容，只取需要的 dist/ 資料夾，放入 NGINX Image 中
WORKDIR /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 當然別忘了我們的 NGINX 設定檔
COPY ./conf.d/* /etc/nginx/conf.d/