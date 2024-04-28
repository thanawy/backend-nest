import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@orders/entities/order.entity';
import { Plan } from '@plans/entities/plan.entity';
import { User } from '@users/entities/user.entity';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymobService {

    constructor(
        private readonly httpService: HttpService,
        
    ) {}



    async getPaymentToken({email, phone_number, first_name, last_name, price, currency}) {

        if (!email || !phone_number || !first_name || !last_name || !price || !currency) {
            throw new Error('All fields are required');
        }

        // Authentication Request:
        const auth_token = await this.httpService.axiosRef.post('https://accept.paymob.com/api/auth/tokens',{
            "api_key": process.env.PAYMOB_API_KEY
        })
        
        // Order Registration Request:
        const order = await this.httpService.axiosRef.post('https://accept.paymob.com/api/ecommerce/orders', {
            "auth_token": auth_token.data.token,
            "delivery_needed": "false",
            "amount_cents": price,
            "currency": currency,
            "items": []
        })

        // Payment Key Request:
        const payment_key = await this.httpService.axiosRef.post('https://accept.paymob.com/api/acceptance/payment_keys', {

            "auth_token": auth_token.data.token,
            "amount_cents": price,
            "expiration": 3600,
            "billing_data": {
                "apartment": "NA", 
                "email": email,
                "floor": "NA", 
                "first_name": first_name, 
                "street": "NA", 
                "building": "NA", 
                "phone_number": phone_number, 
                "shipping_method": "NA", 
                "postal_code": "NA", 
                "city": "NA", 
                "country": "NA", 
                "last_name": last_name, 
                "state": "NA"
            },
            "order_id": order.data.id,
            "currency": currency,
            "integration_id": process.env.PAYMOB_INTEGRATION_ID

        })

        return { orderId: order.data.id , paymentToken: payment_key.data.token }

    }

    


}
