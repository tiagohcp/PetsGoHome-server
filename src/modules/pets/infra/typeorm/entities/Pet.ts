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

import Headquarter from '@modules/headquarters/infra/typeorm/entities/Headquarter';
import Visit from '@modules/visits/infra/typeorm/entities/Visit';
import PetsCompatibilities from '@modules/pets/infra/typeorm/entities/PetsCompatibilities';

@Entity('pets')
class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Headquarter, { eager: true })
  @JoinColumn({ name: 'hq_id' })
  headquarter: Headquarter;

  @OneToMany(() => Visit, visit => visit.pet)
  visits: Visit[];

  @OneToMany(
    () => PetsCompatibilities,
    petsCompatibilities => petsCompatibilities.pet,
    {
      eager: true,
      cascade: true,
    },
  )
  pet_compatibilities: PetsCompatibilities[];

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  type: 'dog' | 'cat';

  @Column()
  breed: string;

  @Column()
  size: 'PP' | 'P' | 'M' | 'G' | 'GG';

  @Column()
  age: number;

  @Column()
  gender: 'male' | 'female';

  @Column()
  description: string;

  @Column()
  energy: 'low' | 'average' | 'high';

  @Column()
  active: boolean;

  @Column('time with time zone')
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pet;
