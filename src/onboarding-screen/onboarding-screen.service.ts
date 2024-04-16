import { Injectable } from '@nestjs/common';
import { OnboardingScreen } from './entities/onboarding-screen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOnboardingScreenDto } from './dto/create.onboarding-screen.dto';
import { UpdateOnboardingScreenDto } from './dto/update.onboarding-screen.dto';
@Injectable()
export class OnboardingScreenService {

    constructor( 
        @InjectRepository(OnboardingScreen) 
        private onboardingScreenRepository: Repository<OnboardingScreen>,
    ) {}

    findAll() {
        return this.onboardingScreenRepository.find({ order: { order: 'ASC' } });
    }

    findOne(id: string) {
        return this.onboardingScreenRepository.findOneBy({ id });
    }

    create(createOnboardingScreenDto: CreateOnboardingScreenDto) {
        return this.onboardingScreenRepository.save(createOnboardingScreenDto);
    }

    update(id: string, updateOnboardingScreenDto: UpdateOnboardingScreenDto) {
        return this.onboardingScreenRepository.update(id, updateOnboardingScreenDto);
    }

    remove(id: string) {
        return this.onboardingScreenRepository.delete(id);
    }
    
}
