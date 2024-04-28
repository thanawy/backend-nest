import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseGuards, Inject, Query } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { AuthenticatedGuard } from '@auth/guards/authenticated.guard';
import { PlansService } from '@plans/plans.service';
import { OrdersService } from '@orders/orders.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@orders/entities/order.entity';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '@subscriptions/subscriptions.service';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto'


@Controller('paymob')
export class PaymobController {

    constructor(
        private readonly paymobService: PaymobService,
        private readonly plansService: PlansService,
        private readonly ordersService: OrdersService,
        private readonly subscriptionsService: SubscriptionsService
    ){}

    @Get('/payment-token')
    @UseGuards(AuthenticatedGuard)
    async createPaymentToken(
        @Req() req: any,
        @Body() body: any
    ): Promise<string> {
        const {user_id, email, phoneNumber, displayName} = req.user.id;
        const { plan_id } = body;

        const choosenPlan = await this.plansService.findOne(plan_id);

        const { orderId, paymentToken } = await this.paymobService.getPaymentToken({
            email: email,
            phone_number: phoneNumber, 
            first_name: displayName, 
            last_name: displayName, 
            price: 100 * choosenPlan.price, 
            currency: choosenPlan.currency
        });

        this.ordersService.create({
            planId: choosenPlan.id,
            orderId: orderId,
            userId: user_id,
        })

        return paymentToken
    }


    @Get('/webhook')
    async paymentWebHook(
        @Body() body: any,
        @Query() params: any // this could be a dto
    ): Promise<any>{

        const {
            amount_cents,
            created_at,
            currency,
            error_occured,
            has_parent_transaction,
            id,
            integration_id,
            is_3d_secure,
            is_auth,
            is_capture,
            is_refunded,
            is_standalone_payment,
            is_voided,
            order: { id: order_id },
            owner,
            pending,
            source_data: {
              pan: source_data_pan,
              sub_type: source_data_sub_type,
              type: source_data_type,
            },
            success,
          } = params;

        if (!success) {
            throw new Error('Payment not successful');
        }

        // calculate hmac here first

        let lexicographical  = `${amount_cents} 
        ${created_at}
        ${currency}
        ${error_occured}
        ${has_parent_transaction}
        ${id}
        ${integration_id}
        ${is_3d_secure}
        ${is_auth}
        ${is_capture}
        ${is_refunded}
        ${is_standalone_payment}
        ${is_voided}
        ${order_id}
        ${owner}
        ${pending}
        ${source_data_pan}
        ${source_data_sub_type}
        ${source_data_type}
        ${success}`;

        let hash = createHmac("sha512", process.env.HMAC_KEY)
        .update(lexicographical)
        .digest("hex");

        if(hash !== params.hmac){
            throw new Error('Payment not successful');
        }

        const orderEntity = await this.ordersService.findOne(order_id);

        if (!orderEntity) {
            throw new Error('Order not found');
        }

        const SubscriptionEntity = await this.subscriptionsService.create({
            planId: orderEntity.plan,
            userId: orderEntity.user,
            recurringToken: ""
        })

        if (!SubscriptionEntity) {
            throw new Error('Subscription not created');
        }

        await this.ordersService.remove(orderEntity.id);

        return "Successful Payment";
    }
}
