import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateOrderDto {

    @IsString()
    planId: string;

    @IsString()
    orderId: string;

    @IsString()
    userId: string;
}
