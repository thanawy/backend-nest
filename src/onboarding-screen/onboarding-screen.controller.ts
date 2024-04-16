import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { OnboardingScreen } from './entities/onboarding-screen.entity';
import { OnboardingScreenService } from './onboarding-screen.service';
import { CreateOnboardingScreenDto } from './dto/create.onboarding-screen.dto';
import { UpdateOnboardingScreenDto } from './dto/update.onboarding-screen.dto';
@Controller('onboarding-screen')
export class OnboardingScreenController {

    constructor(
        private readonly onboardingScreenService: OnboardingScreenService
    ){}
    @Get()
    findAll() {
        return this.onboardingScreenService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.onboardingScreenService.findOne(id);
    }

    @Post()
    create(@Body() createOnboardingScreenDto: CreateOnboardingScreenDto) {
        return this.onboardingScreenService.create(createOnboardingScreenDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOnboardingScreenDto: UpdateOnboardingScreenDto) {
        return this.onboardingScreenService.update(id, updateOnboardingScreenDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.onboardingScreenService.remove(id);
    }


}
