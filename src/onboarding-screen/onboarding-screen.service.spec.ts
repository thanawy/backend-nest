import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingScreenService } from './onboarding-screen.service';

describe('OnboardingScreenService', () => {
  let service: OnboardingScreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnboardingScreenService],
    }).compile();

    service = module.get<OnboardingScreenService>(OnboardingScreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
