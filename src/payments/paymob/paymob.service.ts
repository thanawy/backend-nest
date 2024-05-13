import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@orders/entities/order.entity';
import { Plan } from '@plans/entities/plan.entity';
import { User } from '@users/entities/user.entity';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { HttpService } from '@nestjs/axios';
import { createHmac } from 'crypto';

@Injectable()
export class PaymobService {
  constructor(private readonly httpService: HttpService) {}

  
  private async authenticate() {
    return this.httpService.axiosRef
      .post('https://accept.paymob.com/api/auth/tokens', {
        api_key: process.env.PAYMOB_API_KEY,
      })
      .then((response) => response.data.token);
  }

  private async makeRequest(endpoint: string, payload: object) {
    const authToken = await this.authenticate();
    return this.httpService.axiosRef
      .post(`https://accept.paymob.com/api/${endpoint}`, {
        auth_token: authToken,
        ...payload,
      })
      .then((response) => response.data);
  }

  async createOrder(details: { price: number; currency: string }) {
    return this.makeRequest('ecommerce/orders', {
      delivery_needed: 'false',
      amount_cents: details.price,
      currency: details.currency,
      items: [],
    });
  }

  // Create Card payment token
  async getPaymentToken(details: {
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    price: number;
    currency: string;
  }, integration_id: string) {
    const orderData = await this.createOrder(details);
    const paymentData = await this.makeRequest('acceptance/payment_keys', {
      amount_cents: details.price,
      expiration: 3600,
      billing_data: {
        apartment: 'NA',
        email: details.email,
        floor: 'NA',
        first_name: details.first_name,
        street: 'NA',
        building: 'NA',
        phone_number: details.phone_number,
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'NA',
        country: 'NA',
        last_name: details.last_name,
        state: 'NA',
      },
      order_id: orderData.id,
      currency: details.currency,
      integration_id,
    });

    return { orderId: orderData.id, paymentToken: paymentData.token };
  }



  async verifyHmac(
    hmac: string,
    data: any,
    secretKey: string,
  ): Promise<boolean> {
    const lexicographicalString = [
      data.amount_cents,
      data.created_at,
      data.currency,
      data.error_occured,
      data.has_parent_transaction,
      data.id,
      data.integration_id,
      data.is_3d_secure,
      data.is_auth,
      data.is_capture,
      data.is_refunded,
      data.is_standalone_payment,
      data.is_voided,
      data.order?.id || data.order,
      data.owner,
      data.pending,
      data.source_data?.pan || data['source_data.pan'],
      data.source_data?.sub_type || data['source_data.sub_type'],
      data.source_data?.type || data['source_data.type'],
      data.success,
    ].join('');

    const hash = createHmac('sha512', secretKey)
      .update(lexicographicalString)
      .digest('hex');
    return hmac === hash;
  }

}
