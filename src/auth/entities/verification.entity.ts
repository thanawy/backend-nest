import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from '@database/default.entities';
import { User } from '@users/entities/user.entity';

@Entity()
export class Verification extends DefaultEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 256,
    unique: true,
    default: () => 'gen_random_bytes(256)',
  })
  code: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
