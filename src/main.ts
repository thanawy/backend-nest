import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { fastifyCookie } from '@fastify/cookie';
import { loggerConfig } from 'config/logger.config';
import fastifySession from '@mgcrea/fastify-session';
import { sessionConfig } from './config/session.config';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      ...loggerConfig,
    }),
  );
  await app.register(fastifyCookie);
  await app.register(fastifySession, sessionConfig);
  await app.register(fastifyRequestLogger);

  await app.listen(3000);
}

bootstrap();
