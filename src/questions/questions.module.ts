import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '@questions/entities/question.entity';
import { LessonsModule } from '@lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), LessonsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
