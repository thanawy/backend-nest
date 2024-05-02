import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { Repository } from 'typeorm';
import { Verification } from '@auth/entities/verification.entity';
import { CreateVerificationDto } from '@auth/dto/create.verification.dto';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
  ) {}

  async create(verification: CreateVerificationDto) {
    return this.verificationRepository.save(verification);
  }

  async findOrCreate(verification: CreateVerificationDto) {
    return (
      (await this.findByUser(verification.user)) || this.create(verification)
    );
  }

  async findByUser(user: User) {
    return this.verificationRepository.findOne({
      where: { user: { id: user.id } },
    });
  }

  async findByCode(code: string) {
    return this.verificationRepository.findOne({ where: { code } });
  }
}
