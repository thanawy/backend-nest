import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Program } from '@programs/entities/program.entity';
import { Answer } from '@answers/entities/answer.entity';
import { Subscription } from '@subscriptions/entities/subscription.entity';
import { DefaultEntity } from '@database/default.entities';
import { Role } from '@auth/rbac/entities/role.entity';
import { Order } from '@orders/entities/order.entity';

@Unique(['provider', 'providerId'])
@Entity()
export class User extends DefaultEntity {
  @Column({ type: 'varchar', nullable: false })
  provider: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  providerId: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  displayName: string;

  @Column({ type: 'varchar', nullable: true })
  countryCode: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  phoneNumber: string;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => Program, (program) => program.users)
  @JoinColumn()
  program: Program;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  @JoinColumn()
  subscription: Subscription;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
