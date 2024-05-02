import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateOnboardingScreenDto {
  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  img: string;
}
