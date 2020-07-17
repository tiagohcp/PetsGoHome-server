import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('headquarters')
class Headquarter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.headquarters)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Pet, pet => pet.headquarter)
  pets: Pet[];

  @Column()
  name: string;

  @Column()
  identification: string;

  @Column()
  zipcode: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column({
    length: 2,
  })
  state: string;

  @Column()
  whatsapp: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Headquarter;
