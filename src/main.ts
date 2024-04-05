import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { fastifyCookie } from '@fastify/cookie';
import { loggerConfig } from '@config/logger.config';
import fastifySession from '@fastify/session';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import { serverConfig } from '@config/server.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      ...loggerConfig,
      ...serverConfig,
    }),
  );

  // const fastifyPassport = new Authenticator();

  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      secure: true,
    },
  });

  // await app.register(fastifyPassport.initialize());
  // await app.register(fastifyPassport.secureSession());

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
