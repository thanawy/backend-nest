import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { AnswersModule } from '@answers/answers.module';
import { AnswersService } from '@answers/answers.service';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '@answers/entities/answer.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Answer])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
