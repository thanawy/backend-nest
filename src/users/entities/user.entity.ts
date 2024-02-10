import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  OneToOne, JoinColumn,
} from 'typeorm';
import { Program } from 'programs/entities/program.entity';
import { Answer } from 'answers/entities/answer.entity';
import { Subscription } from 'subscriptions/entities/subscription.entity';
import * as bcrypt from 'bcrypt';
import { DefaultEntity } from '../../database/default.entities';

@Entity()
export class User extends DefaultEntity {

  @Column({ type: 'varchar', unique: true, nullable: true })
  facebook_id: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  google_id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  display_name: string;

  @Column({ type: 'varchar', nullable: true })
  country_code: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', default: 'student' })
  role: 'student' | 'teacher' | 'admin';

  @ManyToOne(() => Program, (program) => program.users)
  @JoinColumn()
  program: Program;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  @JoinColumn()
  subscription: Subscription;

}
