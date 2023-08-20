# Dockerfile for the frontend 
# nginx is used to serve the frontend and forward requests to the backend
FROM node:lts-alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/ .
RUN yarn install
RUN yarn build

# copy the build output to nginx
FROM nginx:stable-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/* /etc/nginx/conf.d/