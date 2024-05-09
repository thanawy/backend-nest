import { Module } from '@nestjs/common';
import { PaymobController } from './paymob.controller';
import { PaymobService } from './paymob.service';
import { HttpModule } from '@nestjs/axios';
import { PlansModule } from '@plans/plans.module';
import { OrdersModule } from '@orders/orders.module';
import { UsersModule } from '@users/users.module';
import { SubscriptionsModule } from '@subscriptions/subscriptions.module';
@Module({
    imports: [HttpModule, PlansModule, OrdersModule, UsersModule, SubscriptionsModule],
    controllers: [PaymobController],
    providers: [PaymobService],    
})
export class PaymobModule {}
