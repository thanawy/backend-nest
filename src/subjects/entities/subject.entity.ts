import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Program } from '@programs/entities/program.entity'; // Adjust the path as necessary
import { Chapter } from '@chapters/entities/chapter.entity';
import { DefaultEntity } from "@database/default.entities"; // Adjust the path as necessary

@Entity()
export class Subject extends DefaultEntity {

    @Column( )
    name: string;

    @ManyToMany(() => Program)
    programs: Program[];

    @OneToMany(() => Chapter, (chapter) => chapter.subject)
    chapters: Chapter[];
}
