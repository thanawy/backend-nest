import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDto } from '@units/dto/create-unit.dto';
import { UpdateUnitDto } from '@units/dto/update-unit.dto';
import { Unit } from '@units/entities/unit.entity';
@Injectable()
export class UnitsService {

  constructor(

  @InjectRepository(Unit)
  private readonly unitsRepository: Repository<Unit>,
  ) {}

  create(createUnitDto: CreateUnitDto) {
    const unit = this.unitsRepository.create(createUnitDto);
    return this.unitsRepository.save(unit);
  }

  findAll(classId: string, subjectId:string) {
    return this.unitsRepository.find({
      where: { class: { id: classId }, subject: { id: subjectId } },
    });
  }

  findOne(id: string) {
    return this.unitsRepository.findOneBy({ id });
  }

  update(id: string, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: string) {
    return `This action removes a #${id} unit`;
  }
}
