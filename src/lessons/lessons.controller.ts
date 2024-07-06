import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { UnitsService } from '@units/units.service';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly unitsService: UnitsService
  ) {}

  @Post()
  async create(@Body() body: any) {
    const { name, unitId } = body;

    const unit = await this.unitsService.findOne(unitId);

    return this.lessonsService.create({
      name,
      unit,
    });
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
