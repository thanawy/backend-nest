// services/role.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@auth/rbac/entities/role.entity';
import { Permission } from '@auth/rbac/entities/permission.entity';
import { User } from '@users/entities/user.entity'; // Assuming you have a User entity

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async getUserPermissions(userId: number): Promise<Permission[]> {
    // In this method, we should not directly interact with the userRepository
    // We should fetch the user's roles and permissions from the database instead
    const userRoles = await this.roleRepository.createQueryBuilder("role")
      .innerJoin("role.users", "user")
      .where("user.id = :userId", { userId })
      .getMany();

    const roleIds = userRoles.map(role => role.id);

    const permissions = await this.permissionRepository.createQueryBuilder("permission")
      .innerJoin("permission.roles", "role")
      .where("role.id IN (:...roleIds)", { roleIds: roleIds })
      .getMany();

    return permissions;
  }

  // Other methods from your RoleService class remain unchanged
}