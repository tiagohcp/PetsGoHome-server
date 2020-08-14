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

@Entity('pet_avatars')
class PetAvatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet, pet => pet.petAvatars)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  main: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PetAvatar;
