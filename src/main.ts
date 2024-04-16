import 'dotenv/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { fastifyCookie } from '@fastify/cookie';
import { loggerConfig } from 'config/logger.config';
import fastifySession from '@fastify/session';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import RedisStore from "connect-redis"
import {createClient} from "redis"
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      ...loggerConfig,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  const redisClient = createClient({
    url: process.env.REDIS_URI
  });
  await redisClient.connect().catch(console.error)


  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: new RedisStore({client: redisClient}),
    cookie: {
      maxAge: 86400000,
      secure: true
    }
  });

  await app.register(fastifyRequestLogger);

  app
    .getHttpAdapter()
    .getInstance()
    .addHook('onRequest', (request, reply, done) => {
      // @ts-ignore
      reply.setHeader = function (key, value) {
        return this.raw.setHeader(key, value);
      };
      // @ts-ignore
      reply.end = function () {
        this.raw.end();
      };
      // @ts-ignore
      request.res = reply;
      done();
    });

  await app.listen(3000);
}

bootstrap();
