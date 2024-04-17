import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Subject } from '@subjects/entities/subject.entity'; // Assume the Subject entity is defined elsewhere
import { Question } from '@questions/entities/question.entity'; // Assume the Question entity is defined elsewhere
import { DefaultEntity } from '@database/default.entities';
import { Lesson } from '@lessons/entities/lesson.entity';
import {Class} from "@classes/entities/class.entity"; // Assume the Answer entity is defined elsewhere

@Entity()
export class Unit extends DefaultEntity {
  @Column()
  name: string;

  @ManyToOne(() => Subject, (subject) => subject.units)
  subject: Subject;

  @ManyToOne(() => Class, (classEntity) => classEntity.units)
  class: Class;

  @OneToMany(() => Question, (question) => question.unit)
  questions: Question[];

  @OneToMany(() => Lesson, (lesson) => lesson.unit)
  lessons: Lesson[];
}
