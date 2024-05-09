import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { UsersModule } from '@users/users.module';
import { PlansModule } from '@plans/plans.module';
@Module({
  imports: [DatabaseModule, PlansModule, UsersModule, TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
