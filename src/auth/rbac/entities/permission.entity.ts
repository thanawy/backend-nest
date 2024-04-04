import {
  Entity,
  Column,
  ManyToMany,
} from 'typeorm';
import { DefaultEntity } from '@database/default.entities';

@Entity()
export class Permission extends DefaultEntity {
    
    @Column({ type: 'varchar', nullable: true })
    action: string;
    
    @Column({ type: 'varchar', nullable: true })
    resource: string;
    
}