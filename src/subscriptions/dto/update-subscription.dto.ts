import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from '@subscriptions/dto/create-subscription.dto';
export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
