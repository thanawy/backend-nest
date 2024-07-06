import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from '@lessons/lessons.service';
import { LessonsController } from '@lessons/lessons.controller';
import { Lesson } from '@lessons/entities/lesson.entity';
import { UnitsModule } from '@units/units.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), UnitsModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
