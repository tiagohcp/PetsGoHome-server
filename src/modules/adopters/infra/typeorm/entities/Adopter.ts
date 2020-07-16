import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Visit from './Visit';

@Entity('adopters')
class Adopter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Visit, visit => visit.adopter)
  visits: Visit[];

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

export default Adopter;
