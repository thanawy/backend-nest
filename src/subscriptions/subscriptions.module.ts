import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '@subscriptions/entities/subscription.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
