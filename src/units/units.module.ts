import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Unit } from '@units/entities/unit.entity';
import { ClassesModule } from '@classes/classes.module';
import { SubjectsModule } from '@subjects/subjects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unit]), ClassesModule, SubjectsModule],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}
