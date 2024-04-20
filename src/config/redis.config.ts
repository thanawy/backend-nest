import Redis from 'ioredis';

export const redisConfig = {
  client: new Redis(process.env.REDIS_URI),
  ttl: parseInt(process.env.SESSION_TTL),
};
