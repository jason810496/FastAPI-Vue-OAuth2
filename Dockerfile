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
COPY ./conf.d/* /etc/nginx/conf.d/