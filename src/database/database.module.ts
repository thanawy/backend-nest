import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        ssl: true,
        logging: true,
        entities: [__dirname + '/../**/entities/**.entity{.ts,.js}'],
        migrations: [__dirname + '/../database/migrations/**{.ts,.js}'],
        synchronize: configService.get('DB_SYNC') === 'true', // Caution: true only for development,
        namingStrategy: new SnakeNamingStrategy(),
        logging: false,
      }),
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
