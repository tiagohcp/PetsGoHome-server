import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';

import PetsCompatibilities from './PetsCompatibilities';

@Entity('compatibilities')
class Compatibility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => PetsCompatibilities,
    petsCompatibilities => petsCompatibilities.compatibility,
  )
  pet_compatibilities: PetsCompatibilities[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Compatibility;
