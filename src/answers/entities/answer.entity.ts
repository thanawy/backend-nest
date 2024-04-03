import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Question } from '@questions/entities/question.entity';
import { Chapter } from '@chapters/entities/chapter.entity';
import { DefaultEntity } from '@database/default.entities';

@Entity()
export class Answer extends DefaultEntity {

  @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D'] })
  chosenAnswer: string;

  @Column({ type: 'int', name: 'solution_duration' })
  solutionDuration: number;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => Chapter, (chapter) => chapter.answers)
  chapter: Chapter;
}
