// import { SODIUM_AUTH } from '@mgcrea/fastify-session-sodium-crypto';
// import { RedisStore } from '@mgcrea/fastify-session-redis-store';
// import { redisConfig } from './redis.config';
//
// export const sessionConfig = {
//   key: Buffer.from(process.env.SESSION_SECRET , 'base64'),
//   crypto: SODIUM_AUTH,
//   store: new RedisStore(redisConfig),
//   cookie: {
//     maxAge: parseInt(process.env.SESSION_TTL),
//   },
// };
