import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateSubscriptionDto {

    @IsString()
    planId: string;

    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    recurringToken: string;

}
