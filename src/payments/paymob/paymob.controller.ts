import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseGuards, Inject, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { AuthenticatedGuard } from '@auth/guards/authenticated.guard';
import { PlansService } from '@plans/plans.service';
import { OrdersService } from '@orders/orders.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@orders/entities/order.entity';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '@subscriptions/subscriptions.service';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from '@subscriptions/dto/create-subscription.dto';


@Controller('paymob')
export class PaymobController {

    constructor(
        private readonly paymobService: PaymobService,
        private readonly plansService: PlansService,
        private readonly ordersService: OrdersService,
        private readonly subscriptionsService: SubscriptionsService
    ){}

    @Post('/payment-token')
    @UseGuards(AuthenticatedGuard)
    async createPaymentToken(
        @Req() req: any,
        @Body() body: any
    ): Promise<any> {

        const {email, phoneNumber, displayName} = req.user;

        const { plan_id, payment_method } = body;

        let integration_id: string;

        switch (payment_method) {
            case 'card':
                integration_id = process.env.PAYMOB_CARD_INTEGRATION_ID
                break;
            case 'kiosk':
                integration_id = process.env.PAYMOB_KIOSK_INTEGRATION_ID
                break;
            case 'wallet':
                integration_id = process.env.PAYMOB_WALLET_INTEGRATION_ID
                break;
        }

        const choosenPlan = await this.plansService.findOne(plan_id);

        if (!choosenPlan) {
           throw new HttpException('Plan not found', 404);
        }

        const { orderId, paymentToken } = await this.paymobService.getPaymentToken({
            email: email,
            phone_number: phoneNumber || 'NA', 
            first_name: displayName || 'NA', 
            last_name: displayName || 'NA', 
            price: 100 * choosenPlan.price, 
            currency: choosenPlan.currency
        }, integration_id);

        this.ordersService.create({
            plan: choosenPlan,
            orderId: orderId,
            user: req.user,
        })

        return paymentToken
    }




    @Post('/webhook')
    async paymentWebHook(
        @Body() body: any,
        @Query() params: any
    ): Promise<any>{

        // TOKEN HOOK

        if(body.type === 'TOKEN'){

            const { order, token } = body.obj;
            
            const orderEntity = await this.ordersService.findOneByOrderId(order.id);

            if(!orderEntity){
                throw new HttpException('Order not found', 404);
            }

            this.ordersService.update(orderEntity.id, {
                recurringToken: token,
                tokenObject: body.obj
            })

        }


        // TRANSACTION

        if(body.type === 'TRANSACTION'){

        const validHmac = await this.paymobService.verifyHmac(params.hmac, body.obj, process.env.HMAC_KEY);

        if(validHmac && body.obj.success){

            const orderEntity = await this.ordersService.findOneByOrderId(body.obj.order.id);

            
            if (!orderEntity) {
                throw new HttpException('Order not found', 404);
            }

            console.log('Order Before update', orderEntity);
            
            this.ordersService.update(orderEntity.id, {
                transactionDetails: body.obj
            })

            console.log('Order After update', orderEntity);
            // check for the user if already subscribed 
        
            const existingSubscription = await this.subscriptionsService.findOneByUserId(orderEntity.user.id);

            if (existingSubscription) {

                const currentTime = new Date();
                const timeLeft = existingSubscription.endTime.getTime() - currentTime.getTime();
                const planDuration = orderEntity.plan.duration * 24 * 60 * 60 * 1000;
                console.log(timeLeft);
                if (timeLeft > 0) {

                    await this.subscriptionsService.remove(existingSubscription.id);
                    console.log('Subscription removed');


                    const SubscriptionEntity = await this.subscriptionsService.create({
                        user: orderEntity.user,
                        plan: orderEntity.plan,
                        recurringToken: orderEntity.recurringToken || '',
                        endTime: new Date(new Date().getTime() + timeLeft + planDuration)
                    })

                    if (!SubscriptionEntity) {
                        throw new HttpException('Subscription not created', 404);
                    }
                }

            }else{
                const SubscriptionEntity = await this.subscriptionsService.create({
                    user: orderEntity.user,
                    plan: orderEntity.plan,
                    recurringToken: orderEntity.recurringToken || ''
                })
                if (!SubscriptionEntity) {
                    throw new HttpException('Subscription not created', 404);
                }
            }
            
            this.ordersService.update(orderEntity.id, {
                status: true
            })

        }
    }
        return;
    }

    @Get('/payment-status')
    async getPaymentStatus(@Query() query: any): Promise<string> {
        const { order, hmac } = query;

        console.log(query)

        if (!order || !hmac) {
            throw new HttpException('Missing order ID or HMAC', HttpStatus.BAD_REQUEST);
        }

        try {
            const orderEntity = await this.ordersService.findOneByOrderId(order);
            console.log(orderEntity)
            if (!orderEntity) {
                throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
            }

            const isValidHmac = await this.paymobService.verifyHmac(hmac, query, process.env.HMAC_KEY);
            console.log(isValidHmac)
            if (!isValidHmac) {
                throw new HttpException('Invalid HMAC signature', HttpStatus.UNAUTHORIZED);
            }

            return orderEntity.status ? "Successful Payment" : "Failed Payment";
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
}
