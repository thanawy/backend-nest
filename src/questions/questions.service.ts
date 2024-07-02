import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '@questions/entities/question.entity';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async findAll(filters: {
    classId?: string;
    subjectId?: string;
    lessonId?: string;
    unitId?: string;
    page?: number;
    pageSize?: number;
  }) {
    const {
      classId,
      subjectId,
      lessonId,
      unitId,
      page = 1,
      pageSize = 10,
    } = filters;

    return await this.questionRepository.findAndCount({
      relations: [
        'lesson',
        'lesson.unit',
        'lesson.unit.subject',
        'lesson.unit.class',
      ],
      where: {
        lesson: {
          id: lessonId,
          unit: {
            id: unitId,
            subject: {
              id: subjectId,
            },
            class: {
              id: classId,
            },
          },
        },
      },
      skip: (page - 1) * pageSize, // Determines the offset
      take: pageSize,
    });
  }

  async findOne(id: string) {
    return this.questionRepository.findOne({
      where: { id },
      relations: ['choices'],
    });
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['choices'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    // Update question properties
    question.description =
      updateQuestionDto.description || question.description;

    // Update choices, if they exist in the DTO
    if (updateQuestionDto.choices) {
      updateQuestionDto.choices.forEach((dto) => {
        const choice = question.choices.find((c) => c.id === dto.id);
        if (choice) {
          choice.content = dto.content || choice.content;
          choice.isCorrect = dto.isCorrect ?? choice.isCorrect;
        }
        // Optionally handle adding new choices or removing old ones here
      });
    }

    await this.questionRepository.save(question); // Save the question and related choices

    return question;
  }

  async remove(id: string) {
    return await this.questionRepository.softDelete(id);
  }
}
