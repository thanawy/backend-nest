import {
    Entity,
    Column,
    ManyToOne,
    BeforeInsert,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Plan } from '@plans/entities/plan.entity';
import {DefaultEntity} from "@database/default.entities";

@Entity()
export class Subscription extends DefaultEntity {

    @Column('timestamptz')
    startTime: Date;

    @Column('timestamptz')
    endTime: Date;

    @Column()
    recurringToken: string;

    @Column('timestamptz', { nullable: true })
    nextRenewal: string;

    @OneToOne(() => User, user => user.subscription)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Plan, plan => plan.subscriptions)
    @JoinColumn()
    plan: Plan;

    @BeforeInsert()
    async setDates(): Promise<void> {
        if (!this.startTime) {
            this.startTime = new Date();
        }

        if (!this.endTime) {
            const plan = await this.plan;
            const durationInMilliseconds = (plan.duration + plan.noticePeriod) * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            this.endTime = new Date(this.startTime.getTime() + durationInMilliseconds);
        }
    }
}
