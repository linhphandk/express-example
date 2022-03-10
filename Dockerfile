# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=development
EXPOSE 8000
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]