import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { Subject } from './entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsModule } from '@programs/programs.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), ProgramsModule, UsersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
