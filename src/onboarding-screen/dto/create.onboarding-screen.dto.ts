import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateOnboardingScreenDto {
    @IsNumber()
    order: number;

    @IsString()
    title: string;

    @IsString()
    description: string;
    
    @IsUrl()
    img: string;
}
