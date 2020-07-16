import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import PetsCompatibilities from './PetsCompatibilities';

@Entity('compatibilities')
class Compatibility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => PetsCompatibilities,
    petsCompatibilities => petsCompatibilities.compatibility,
  )
  petsCompatibilities: PetsCompatibilities[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Compatibility;
