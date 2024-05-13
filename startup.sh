echo $SECRETS | base64 --decode > /app/.env

yarn start