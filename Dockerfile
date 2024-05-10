FROM node:18
LABEL authors="thanawy"

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

CMD ["echo $SECRETS | base64 --decode > /app/.env & yarn start"]