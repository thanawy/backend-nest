import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Program } from 'programs/entities/program.entity'
import { Answer } from 'answers/entities/answer.entity';
import { Subscription } from 'subscriptions/entities/subscription.entity';
import { Payment } from 'payments/entities/payment.entity';
import * as bcrypt from 'bcrypt-ts';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    facebook_id: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    google_id: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'varchar', nullable: true })
    display_name: string;

    @Column({ type: 'varchar', nullable: true })
    country_code: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    phone_number: string;

    @Column({ type: 'varchar', default: 'student' })
    role: string;

    @ManyToOne(() => Program, (program) => program.user)
    program: Program;

    @OneToMany(() => Answer, (answer) => answer.user)
    answers: Answer[];

    @OneToOne(() => Subscription, (subscription) => subscription.user)
    subscription: Subscription;

    @OneToOne(() => Payment, (payment) => payment.user)
    payment: Payment;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
