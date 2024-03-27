import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'process';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  entities: [__dirname + '/../**/entities/**.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'true', // Caution: true only for development,
  namingStrategy: new SnakeNamingStrategy(),
});
