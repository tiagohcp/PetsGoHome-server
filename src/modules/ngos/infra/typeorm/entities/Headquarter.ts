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
import Ngo from './Ngo';

@Entity('headquarters')
class Headquarter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ngo_id: string;

  @ManyToOne(() => Ngo, ngo => ngo.headquarters)
  @JoinColumn({ name: 'ngo_id' })
  ngo: Ngo;

  @OneToMany(() => Pet, pet => pet.headquarter)
  pets: Pet[];

  @Column()
  name: string;

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
