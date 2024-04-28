import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Plan])],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
