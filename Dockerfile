FROM node:18
LABEL authors="thanawy"

WORKDIR /app

COPY . .

RUN yarn install && yarn run build
RUN chmod +x ./startup.sh

ENTRYPOINT ["sh", "-c"]
CMD ["./startup.sh"]
