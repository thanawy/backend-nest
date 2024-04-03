import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'process';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  migrations: [__dirname + '/../database/migrations/**{.ts,.js}'],
  seeds: [__dirname + '/../database/seeds/**{.ts,.js}'],
  entities: [__dirname + '/../**/entities/**.entity{.ts,.js}'],
  factories: [__dirname + '/../**/entities/**.factory{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'true', // Caution: true only for development,
  namingStrategy: new SnakeNamingStrategy(),
};
export default new DataSource(options);
