import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('headquarters')
class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet, pet => pet.visits)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.visits)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Favorite;
