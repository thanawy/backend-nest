import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Unit } from '@units/entities/unit.entity'; // Assume the Unit entity is defined elsewhere
import { Tag } from '@tags/entities/tag.entity'; // Assume the Tag entity is defined elsewhere
import { Answer } from '@answers/entities/answer.entity'; // Assume the Answer entity is defined elsewhere
import { Collection } from '@collections/entities/collection.entity'; // Assume the Collection entity is defined elsewhere
import { DefaultEntity } from '@database/default.entities';
import {Choice} from "@choice/entities/choice.entity";
import {Lesson} from "@lessons/entities/lesson.entity";

@Entity()
export class Question extends DefaultEntity {

  @Column()
  description: string;

  @ManyToOne(() => Unit, (unit) => unit.questions)
  unit: Unit;

  @ManyToOne(() => Lesson, (lesson) => lesson.questions)
  lesson: Lesson;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'question_tag' })
  tags: Tag[];

  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(() => Collection, (collection) => collection.questions)
  @JoinTable({ name: 'question_collection' })
  collections: Collection[];
}
