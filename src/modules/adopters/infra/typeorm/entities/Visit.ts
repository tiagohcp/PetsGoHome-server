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
import Adopter from './Adopter';

@Entity('headquarters')
class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet, pet => pet.visits)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  adopter_id: string;

  @ManyToOne(() => Adopter, adopter => adopter.visits)
  @JoinColumn({ name: 'adopter_id' })
  adopter: Adopter;

  @Column('time with time zone')
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Visit;
