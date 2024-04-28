import {
    Entity,
    Column,
    OneToMany,
    BeforeInsert,
    ManyToOne,
  } from 'typeorm';
import { DefaultEntity } from '@database/default.entities';
import { User } from '@users/entities/user.entity';
import { Plan } from '@plans/entities/plan.entity';

@Entity()
export class Order extends DefaultEntity {

    @Column()
    orderId: string;

    @ManyToOne(() => User, user => user.orders, { eager: true })
    user: User;

    @ManyToOne(() => Plan, plan => plan.orders, { eager: true })
    plan: Plan;

}