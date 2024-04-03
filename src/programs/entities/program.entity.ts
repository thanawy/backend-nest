import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '@users/entities/user.entity'; // Ensure correct path
import { Subject } from '@subjects/entities/subject.entity';
import { DefaultEntity } from '@database/default.entities'; // Ensure correct path

@Entity()
export class Program extends DefaultEntity {
  @Column({ type: 'varchar' })
  division: string;

  @OneToMany(() => User, (user) => user.program)
  users: User[];

  @ManyToMany(() => Subject)
  @JoinTable({ name: 'program_subject' })
  subjects: Subject[];
}
