import { Controller, Get, Post, Body, Query, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

import { ClassesService } from '@classes/classes.service';
import { SubjectsService } from '@subjects/subjects.service';

@Controller('units')
export class UnitsController {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly classesService: ClassesService,
    private readonly subjectsService: SubjectsService
  ) {}

  @Post()
  async create(@Body() body: any) {

    const { name, classId, subjectId } = body

    const subject = await this.subjectsService.findOne(subjectId);

    const term = await this.classesService.findOne(classId);

    if(!subject || !term) {
      throw new HttpException('Not found', 404);
    }

    return this.unitsService.create({
      name,
      class: term,
      subject: subject
    });
  }

  @Get()
  findAll(
    @Query() query:{
      classId?: string;
      subjectId?: string;
    }
  ) {


    return this.unitsService.findAll(query.classId, query.subjectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitsService.update(id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(id);
  }
}
