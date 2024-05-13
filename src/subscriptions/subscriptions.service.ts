import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>
  ){}


  create(createSubscriptionDto: CreateSubscriptionDto) {
    const entity = this.subscriptionRepository.create(createSubscriptionDto);
    return this.subscriptionRepository.save(entity);
  }

  findAll() {
    return this.subscriptionRepository.find();
  }

  findOneByUserId(userId: string) {
    return this.subscriptionRepository.findOneBy({ user: { id: userId } });
  }

  findOne(id: string) {
    return this.subscriptionRepository.findOneBy({ id });
  }

  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionRepository.update(id, updateSubscriptionDto);
  }

  remove(id: string) {
    return this.subscriptionRepository.delete(id);
  }
}
