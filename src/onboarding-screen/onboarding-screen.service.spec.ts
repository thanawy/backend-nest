import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingScreenService } from '@onboarding-screen/onboarding-screen.service';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingScreen } from '@onboarding-screen/entities/onboarding-screen.entity';

describe('OnboardingScreenService', () => {
  let service: OnboardingScreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([OnboardingScreen])],
      providers: [OnboardingScreenService],
    }).compile();

    service = module.get<OnboardingScreenService>(OnboardingScreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
