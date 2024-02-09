import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Question } from 'questions/entities/question.entity';
import {DefaultEntity} from "../../database/default.entities"; // Assume the Question entity is defined elsewhere

@Entity()
export class Tag extends DefaultEntity {

    @Column()
    description: string;

    @ManyToMany(() => Question, question => question.tags)
    questions: Question[];
}
