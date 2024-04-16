import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Program } from '@programs/entities/program.entity'; // Adjust the path as necessary
import { Unit } from '@units/entities/unit.entity';
import { DefaultEntity } from '@database/default.entities';
import { Lesson } from '@lessons/entities/lesson.entity'; // Adjust the path as necessary

@Entity()
export class Subject extends DefaultEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program)
  programs: Program[];

  @OneToMany(() => Unit, (unit) => unit.subject)
  units: Unit[];

  @OneToMany(() => Lesson, (lesson) => lesson.subject)
  lessons: Lesson[];
}
