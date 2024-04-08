import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Subject } from '@subjects/entities/subject.entity'; // Assume the Subject entity is defined elsewhere
import { Question } from '@questions/entities/question.entity'; // Assume the Question entity is defined elsewhere
import { DefaultEntity } from '@database/default.entities'; // Assume the Answer entity is defined elsewhere

@Entity()
export class Chapter extends DefaultEntity {

  @Column()
  name: string;

  @ManyToOne(() => Subject, (subject) => subject.chapters)
  subject: Subject;

  @OneToMany(() => Question, (question) => question.chapter)
  questions: Question[];
}
