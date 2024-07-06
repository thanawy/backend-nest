import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '@programs/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService],
})
export class ProgramsModule {}
