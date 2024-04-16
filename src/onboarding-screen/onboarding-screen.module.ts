import { Module } from '@nestjs/common';
import { OnboardingScreenController } from './onboarding-screen.controller';
import { OnboardingScreenService } from './onboarding-screen.service';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingScreen } from './entities/onboarding-screen.entity';
@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([OnboardingScreen])],
  controllers: [OnboardingScreenController],
  providers: [OnboardingScreenService],
  exports: [OnboardingScreenService],
})
export class OnboardingScreenModule {}
