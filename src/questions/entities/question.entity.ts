import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Chapter } from 'chapters/entities/chapter.entity'; // Assume the Chapter entity is defined elsewhere
import { Tag } from 'tags/entities/tag.entity'; // Assume the Tag entity is defined elsewhere
import { Answer } from 'answers/entities/answer.entity'; // Assume the Answer entity is defined elsewhere
import { Collection } from 'collections/entities/collection.entity'; // Assume the Collection entity is defined elsewhere
import { DefaultEntity } from 'database/default.entities';

@Entity()
export class Question extends DefaultEntity {
  @Column('uuid')
  chapterId: string;

  @Column()
  description: string;

  @Column()
  answerA: string;

  @Column()
  answerB: string;

  @Column()
  answerC: string;

  @Column()
  answerD: string;

  @Column({
    type: 'enum',
    enum: ['A', 'B', 'C', 'D'],
  })
  correctAnswer: 'A' | 'B' | 'C' | 'D';

  @ManyToOne(() => Chapter, (chapter) => chapter.questions)
  chapter: Chapter;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'question_tag' })
  tags: Tag[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(() => Collection, (collection) => collection.questions)
  @JoinTable({ name: 'question_collection' })
  collections: Collection[];
}
