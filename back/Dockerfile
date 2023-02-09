FROM node:16.14-alpine
WORKDIR /app-backend

COPY . .
RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]

ENTRYPOINT [ "npm", "run", "dev:db:reset" ]
