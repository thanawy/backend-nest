import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from '@classes/entities/class.entity';
@Injectable()
export class ClassesService {

  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
  ) {}

  create(createClassDto: CreateClassDto) {
    const term = this.classesRepository.create(createClassDto);
    return this.classesRepository.save(term);
  }

  findAll() {
    return this.classesRepository.find();
  }

  findOne(id: string) {
    return this.classesRepository.findOneBy({ id });
  }

  update(id: string, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: string) {
    return `This action removes a #${id} class`;
  }
}
