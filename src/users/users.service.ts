import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {

    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneWithRoles(id: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {id}, relations: { role: { permissions: true} }});
  }

  findOneByFacebookId(facebookId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ facebookId });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
