import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceService } from '@choice/choice.service';
import { ChoiceController } from '@choice/choice.controller';
import { Choice } from '@choice/entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Choice])],
  controllers: [ChoiceController],
  providers: [ChoiceService],
  exports: [ChoiceService],
})
export class ChoiceModule {}
