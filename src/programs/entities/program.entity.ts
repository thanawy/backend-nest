import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany} from 'typeorm';
import { User } from 'users/entities/user.entity'; // Ensure correct path
import { Subject } from 'subjects/entities/subject.entity'; // Ensure correct path

@Entity()
export class Program {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    division: string;

    @OneToMany(() => User, (user) => user.program)
    users: User[];

    @ManyToMany(() => Subject)
    subjects: Subject[];
}
