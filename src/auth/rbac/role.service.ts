// services/role.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '@users/entities/user.entity'; // Assuming you have a User entity

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findById(id: number): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async getUserRoles(userId: number): Promise<string[]> {
    // Assuming you have a relationship between User and Role entities
    const user = await this.userRepository.findOne(userId, { relations: ['roles'] });
    return user.roles.map(role => role.name);
  }
}
