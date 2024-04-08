import {Entity, Column, ManyToOne} from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Question } from '@questions/entities/question.entity';
import { DefaultEntity } from '@database/default.entities';
import {Choice} from "@choice/entities/choice.entity";

@Entity()
export class Answer extends DefaultEntity {

  @Column({ type: 'int' })
  solutionDuration: number;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => Choice, (choice) => choice.answers)
  choice: Choice;
}
