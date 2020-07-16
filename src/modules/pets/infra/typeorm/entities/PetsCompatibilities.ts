import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Pet from './Pet';
import Compatibility from './Compatibility';

@Entity('pets_compatibilities')
class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet, pet => pet.petsCompatibilities)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  compatibility_id: string;

  @ManyToOne(
    () => Compatibility,
    compatibility => compatibility.petsCompatibilities,
  )
  @JoinColumn({ name: 'compatibility_id' })
  compatibility: Compatibility;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Visit;
