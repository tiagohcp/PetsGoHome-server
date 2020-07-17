import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Headquarter from '@modules/headquarters/infra/typeorm/entities/Headquarter';
import Visit from '@modules/visits/infra/typeorm/entities/Visit';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Headquarter, headquarter => headquarter.user)
  headquarters: Headquarter[];

  @OneToMany(() => Visit, visit => visit.user)
  visits: Visit[];

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: 'ngo' | 'adopter';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
