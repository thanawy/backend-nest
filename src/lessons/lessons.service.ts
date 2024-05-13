import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from '@lessons/entities/lesson.entity';

@Injectable()
export class LessonsService {

  constructor(

  @InjectRepository(Lesson)
  private readonly lessonRepository: Repository<Lesson>,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(lesson);
  }

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: string) {
    return this.lessonRepository.findOneBy({ id });
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: string) {
    return `This action removes a #${id} lesson`;
  }
}
