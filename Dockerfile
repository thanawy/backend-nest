FROM node:18
LABEL authors="thanawy"

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD [ "yarn", "run", "start" ]

ENTRYPOINT ["top", "-b"]