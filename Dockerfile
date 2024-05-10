FROM node:18
LABEL authors="thanawy"

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

CMD ["./startup.sh"]