export const loggerConfig = {
  logger: {
    level: 'trace',
    transport: {
      target: '@mgcrea/pino-pretty-compact',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  disableRequestLogging: true,
};
