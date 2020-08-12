import { getRepository, Repository } from 'typeorm';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';

class PetsRepository implements IPetsRepository {
  private ormRepository: Repository<Pet>;

  constructor() {
    this.ormRepository = getRepository(Pet);
  }

  public async findById(id: string): Promise<Pet | undefined> {
    const pet = await this.ormRepository.findOne(id);

    return pet;
  }

  public async findByFilter(type: 'dog' | 'cat'): Promise<Pet[] | undefined> {
    const pets = await this.ormRepository.find({
      where: { type },
    });

    return pets;
  }

  public async create(petData: ICreatePetDTO): Promise<Pet> {
    console.log('***PetsRepository.create.petData ', petData);
    const pet = this.ormRepository.create({
      headquarter: petData.headquarter,
      avatar: petData.pet.avatar,
      name: petData.pet.name,
      type: petData.pet.type,
      breed: petData.pet.breed,
      size: petData.pet.size,
      age: petData.pet.age,
      gender: petData.pet.gender,
      description: petData.pet.description,
      energy: petData.pet.energy,
      active: petData.pet.active,
      expires_at: petData.pet.expires_at,
      pet_compatibilities: petData.compatibilities,
    });

    console.log('***PetsRepository.create.pet ', pet);

    await this.ormRepository.save(pet);

    return pet;
  }

  public async save(pet: Pet): Promise<Pet> {
    return this.ormRepository.save(pet);
  }
}

export default PetsRepository;
