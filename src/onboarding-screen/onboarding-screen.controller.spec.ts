import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingScreenController } from './onboarding-screen.controller';

describe('OnboardingScreenController', () => {
  let controller: OnboardingScreenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingScreenController],
    }).compile();

    controller = module.get<OnboardingScreenController>(OnboardingScreenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
