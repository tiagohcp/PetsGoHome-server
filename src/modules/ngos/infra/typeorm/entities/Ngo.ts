import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Headquarter from './Headquarter';

@Entity('ngos')
class Ngo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Headquarter, headquarter => headquarter.ngo)
  headquarters: Headquarter[];

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Ngo;
