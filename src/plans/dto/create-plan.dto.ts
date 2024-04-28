import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreatePlanDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    currency: string;

    @IsNumber()
    duration: number;

    @IsOptional()
    isFree: boolean;

    @IsOptional()
    isCouponed: boolean;

    @IsOptional()
    noticePeriod: number;

}
