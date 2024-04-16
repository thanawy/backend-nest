import { DefaultEntity } from '@database/default.entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from '@lessons/entities/lesson.entity';
import { Subject } from '@subjects/entities/subject.entity';
import { Unit } from '@units/entities/unit.entity';

@Entity()
export class Class extends DefaultEntity {
  @Column()
  name: string;

  @OneToMany(() => Lesson, (lesson) => lesson.class)
  lessons: Lesson[];

  @OneToMany(() => Unit, (unit) => unit.class)
  units: Unit[];
}
