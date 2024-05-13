import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ProgramsService } from '@programs/programs.service';
@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly programsService: ProgramsService
  ) {}

  @Post()
  async create(@Body() body: any) {
    const program = await this.programsService.findOne(body.programId);

    return this.subjectsService.create({
      name: body.name,
      programs: [program]
    });
  }


  @Get('')
  async findAll(
    @Query('programId') id: string
  ) {
    if (!id) {
      const subjects = await this.subjectsService.findAll();
      if (!subjects) {
        throw new HttpException('Not found', 404);
      }
      return subjects
    }
    const subjects = await this.subjectsService.findAllByProgramId(id);
    if (!subjects) {
      throw new HttpException('Not found', 404);
    }
    return subjects
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
