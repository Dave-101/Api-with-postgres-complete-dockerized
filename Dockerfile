# FROM alpine:latest

# RUN apk add --no-cache nodejs npm

# WORKDIR /app
# COPY . /app

# RUN npm install

# EXPOSE 3050

# ENTRYPOINT ["node"]

# CMD ["app.js"]

FROM node:10

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 3050

CMD npm start