import { Column, Entity, OneToOne } from 'typeorm';
import { DefaultEntity } from '@database/default.entities';
import { User } from '@users/entities/user.entity';

@Entity()
class Verification extends DefaultEntity {
  @Column({ type: 'varchar', nullable: false, length: 256 })
  code: string;

  @OneToOne(() => User)
  user: User;
}
