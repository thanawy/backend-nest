import { Plan } from '@plans/entities/plan.entity';
import { User } from '@users/entities/user.entity';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateOrderDto {

    plan: Plan;

    @IsString()
    orderId: string;

    user: User;
}
