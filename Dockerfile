FROM node:18
LABEL authors="thanawy"

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

CMD ["sh", "-c", "echo $SECRETS | base64 --decode > /app/.env && yarn start"]
