import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import { DefaultEntity } from '../../database/default.entities';
import {Question} from "../../questions/entities/question.entity";

@Entity()
export class Collection extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => Question, question => question.collections)
  questions: Question[];
}
