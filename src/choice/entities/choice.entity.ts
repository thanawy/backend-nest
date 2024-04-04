import { DefaultEntity } from '@database/default.entities';
import { Question } from '@questions/entities/question.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Answer } from '@answers/entities/answer.entity';

@Entity()
export class Choice extends DefaultEntity {
  @Column({ type: 'varchar', nullable: true })
  public content: string;

  @Column({ type: 'boolean', nullable: false })
  public isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.choices)
  public question: Question;

  @OneToMany(() => Answer, (answer) => answer.choice)
  public answers: Answer[];
}
