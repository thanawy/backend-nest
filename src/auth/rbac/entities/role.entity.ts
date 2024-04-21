import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { DefaultEntity } from '@database/default.entities';
import { Permission } from '@auth/rbac/entities/permission.entity';

@Entity()
export class Role extends DefaultEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;
  // 'student' | 'teacher' | 'admin';

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];
}
