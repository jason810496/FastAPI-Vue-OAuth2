FROM node:lts-alpine

# 建置 dist/
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ../client/package.json
COPY yarn.lock ../client/yarn.lock
RUN yarn install
RUN yarn build


# Stage-B: 
# 使用 NGINX image
FROM nginx

# 從 Stage-A COPY 過的內容，只取需要的 dist/ 資料夾，放入 NGINX Image 中
WORKDIR /app
COPY --from=0 /app/dist ./dist/
# 當然別忘了我們的 NGINX 設定檔
COPY conf.d/* /etc/nginx/conf.d/