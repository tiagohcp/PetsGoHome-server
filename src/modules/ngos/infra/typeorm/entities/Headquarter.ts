import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Ngo from './Ngo';

@Entity('headquarters')
class Headquarter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ngo_id: string;

  @ManyToOne(() => Ngo)
  @JoinColumn({ name: 'ngo_id' })
  ngo: Ngo;

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
