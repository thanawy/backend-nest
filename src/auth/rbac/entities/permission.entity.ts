import {
  Entity,
  Column,
  ManyToMany,
} from 'typeorm';
import { DefaultEntity } from '@database/default.entities';

@Entity()
export class Permission extends DefaultEntity {

  constructor(permission: Partial<Permission>) {
    super();
    Object.assign(this, permission);
  }
    
    @Column({ type: 'varchar', nullable: true })
    action: string;
    
    @Column({ type: 'varchar', nullable: true })
    resource: string;

    equals(permission: Permission): boolean {
        return this.action === permission.action && this.resource === permission.resource
    }
    
}