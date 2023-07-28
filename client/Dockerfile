FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY yarn.lock .
RUN yarn install

CMD ["yarn", "preview" , "--port" , "8080" , "--host"]
