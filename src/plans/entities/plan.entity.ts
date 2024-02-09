import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Subscription } from 'subscriptions/entities/subscription.entity';
import { DefaultEntity } from '../../database/default.entities';

@Entity()
export class Plan extends DefaultEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  currency: string;

  @Column('integer')
  duration: number;

  @Column({ default: false })
  isFree: boolean;

  @Column({ default: false })
  isCouponed: boolean;

  @Column({ nullable: true })
  noticePeriod: number;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];

  @BeforeInsert()
  setFreeFlag(): void {
    if (this.price === 0) {
      this.isFree = true;
    }
  }
}
