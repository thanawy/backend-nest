import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '@users/entities/user.entity';
import { Plan } from '@plans/entities/plan.entity';

export class CreateSubscriptionDto {
    
    @Type(() => User)   
    user: User;

    @Type(() => Plan)
    plan: Plan;

    @IsString()
    recurringToken: string;
    
    @IsOptional()
    @IsDate()
    startTime?: Date;

    @IsOptional()
    @IsDate()
    endTime?: Date;

    @IsOptional()
    @IsDate()
    nextRenewal?: Date;

    
}