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
class PetsCompatibilities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pet, pet => pet.pet_compatibilities)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @ManyToOne(
    () => Compatibility,
    compatibility => compatibility.pet_compatibilities,
  )
  @JoinColumn({ name: 'compatibility_id' })
  compatibility: Compatibility;

  @Column()
  pet_id: string;

  @Column()
  compatibility_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PetsCompatibilities;
