import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        ssl: true,
        entities: [__dirname + '/../**/entities/**.entity{.ts,.js}'],
        migrations: [__dirname + '/../database/migrations/**{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNC'), // Caution: true only for development,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
