FROM node:current-alpine3.19
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD [ "npm","run","start:dev" ]