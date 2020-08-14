import { uuid } from 'uuidv4';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';

class FakePetsRepository implements IPetsRepository {
  private pets: Pet[] = [];

  public async findById(id: string): Promise<Pet | undefined> {
    const findPet = this.pets.find(pet => pet.id === id);

    return findPet;
  }

  public async findByFilter(type: 'dog' | 'cat'): Promise<Pet[] | undefined> {
    const findPets = this.pets.filter(pet => pet.type === type);

    return findPets;
  }

  public async findByHeadquarter(hq_id: string): Promise<Pet[] | undefined> {
    const findPet = this.pets.filter(pet => pet.headquarter.id === hq_id);

    return findPet;
  }

  public async create(petData: ICreatePetDTO): Promise<Pet> {
    const pet = new Pet();

    Object.assign(
      pet,
      { id: uuid() },
      { headquarter: petData.headquarter },
      { pet_compatibilities: petData.compatibilities },
      petData.pet,
    );

    this.pets.push(pet);

    return pet;
  }

  public async save(pet: Pet): Promise<Pet> {
    const findIndex = this.pets.findIndex(findPet => findPet.id === pet.id);

    this.pets[findIndex] = pet;

    return pet;
  }
}

export default FakePetsRepository;
