import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramsService {

  constructor(

  @InjectRepository(Program)
  private readonly programsRepository: Repository<Program>,
  ) {}

  create(createProgramDto: CreateProgramDto) {
    const program = this.programsRepository.create(createProgramDto);
    return this.programsRepository.save(program);
  }

  findAll() {
    return this.programsRepository.find();
  }

  findOne(id: string) {
    return this.programsRepository.findOneBy({ id });
  }

  update(id: string, updateProgramDto: UpdateProgramDto) {
    return `This action updates a #${id} program`;
  }

  remove(id: string) {
    return `This action removes a #${id} program`;
  }
}
