import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: 'debug',
        transport: {
          target: '@mgcrea/pino-pretty-compact',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore:
              'pid,hostname',
          },
        },
      },
      disableRequestLogging: true,
    }),
  );
  await app.register(fastifyRequestLogger)
  await app.listen(3000);

}

bootstrap();
