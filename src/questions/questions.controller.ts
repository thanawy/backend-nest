import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException  } from '@nestjs/common';
import { QuestionsService } from '@questions/questions.service';
import { CreateQuestionDto } from '@questions/dto/create-question.dto';
import { UpdateQuestionDto } from '@questions/dto/update-question.dto';
import { LessonsService } from '@lessons/lessons.service';


@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly lessonsService: LessonsService
  ) {}

  @Post()
  async create(@Body() body: any) {
    // Check if the body contains an array of questions
    if (Array.isArray(body)) {
      const results = [];
      for (const item of body) {
        const lesson = await this.lessonsService.findOne(item.lessonId);
        if (!lesson) {
          throw new BadRequestException(`Lesson not found for ID: ${item.lessonId}`);
        }
        console.log(lesson);
        const result = await this.questionsService.create({
          lesson,
          description: item.description,
          choices: item.choices
        });
        results.push(result);
      }
      return results;
    } else {
      // Handle single question creation
      const lesson = await this.lessonsService.findOne(body.lessonId);
      if (!lesson) {
        throw new BadRequestException(`Lesson not found for ID: ${body.lessonId}`);
      }
      console.log(lesson);
      return this.questionsService.create({
        lesson,
        description: body.description,
        choices: body.choices
      });
    }
  }

  @Get()
  findAll(@Query() query: {
    class?: string;
    subject?: string;
    lesson?: string;
    unit?: string;
    page?: number;
    pageSize?: number;
  }) {
    return this.questionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
