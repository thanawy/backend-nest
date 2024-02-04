import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Program } from 'programs/entities/program.entity'; // Adjust the path as necessary
import { Chapter } from 'chapters/entities/chapter.entity'; // Adjust the path as necessary

@Entity()
export class Subject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject_name: string;

    @ManyToMany(() => Program)
    @JoinTable()
    programs: Program[];

    @OneToMany(() => Chapter, (chapter) => chapter.subject)
    chapters: Chapter[];
}
