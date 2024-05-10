FROM node:18
LABEL authors="thanawy"

WORKDIR /app

COPY . .

RUN yarn install && yarn run build

ENTRYPOINT ["sh", "-c"]
CMD ["./startup.sh"]
