import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';


@Injectable()
export class SubjectsService {

  constructor(

  @InjectRepository(Subject)
  private readonly subjectsRepository: Repository<Subject>,
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectsRepository.create(createSubjectDto);
    return this.subjectsRepository.save(subject);
  }

  findAll() {
    return this.subjectsRepository.find();
  }

  findAllByProgramId(id: string) {
    return this.subjectsRepository.find({ where: { programs: { id } } });
  }

  findOne(id: string) {
    return this.subjectsRepository.findOneBy({ id });
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: string) {
    return `This action removes a #${id} subject`;
  }
}
