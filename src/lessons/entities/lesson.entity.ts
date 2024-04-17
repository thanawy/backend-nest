import { DefaultEntity } from '@database/default.entities';
import { Class } from '@classes/entities/class.entity';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { Unit } from '@units/entities/unit.entity';
import { Subject } from '@subjects/entities/subject.entity';
import { Program } from '@programs/entities/program.entity';
import {Question} from "@questions/entities/question.entity";

@Entity()
export class Lesson extends DefaultEntity {

  @Column()
  name: string;

  // many lessons can be in each unit
  @ManyToOne(() => Unit, (unit) => unit.lessons)
  unit: Unit;

  // many lessons can be in each class
  @ManyToOne(() => Class)
  class: Class;

  // many lessons can be in each subject
  @ManyToOne(() => Subject, (subject) => subject.lessons)
  subject: Subject;

  // many lessons can be in each program
  @ManyToOne(() => Program)
  program: Program;

  @OneToMany(() => Question, (question) => question.unit)
  questions: Question[];
}
