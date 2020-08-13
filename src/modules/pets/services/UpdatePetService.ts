import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import IPetsRepository from '../repositories/IPetsRepository';
import ICompatibilitiesRepository from '../repositories/ICompatibilitiesRepository';
import ICompatibility from '../dtos/ICreateCompatibilityDTO';
import Pet from '../infra/typeorm/entities/Pet';
import Compatibility from '../infra/typeorm/entities/Compatibility';
import PetsCompatibilities from '../infra/typeorm/entities/PetsCompatibilities';

interface IRequest {
  hq_id: string;
  pet: {
    avatar: string;
    name: string;
    type: 'dog' | 'cat';
    breed: string;
    size: 'PP' | 'P' | 'M' | 'G' | 'GG';
    age: number;
    gender: 'male' | 'female';
    description: string;
    energy: 'low' | 'average' | 'high';
    active: boolean;
    expires_at: Date;
  };
  compatibilities: ICompatibility[];
}

@injectable()
class UpdatePetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,

    @inject('CompatibilitiesRepository')
    private compatibilitiesRepository: ICompatibilitiesRepository,

    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute(
    petData: IRequest,
    id: string,
    user_id: string,
  ): Promise<Pet> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new AppError('Pet is not cadastred');
    }

    const headquarter = await this.headquartersRepository.findById(
      petData.hq_id,
    );

    if (headquarter === undefined) {
      throw new AppError('Headquarter is not cadastred.');
    }

    if (headquarter.user_id !== user_id) {
      throw new AppError('Only can update a your own pet.');
    }

    delete headquarter.pets;

    let existentCompatibilities = await this.compatibilitiesRepository.findByName(
      petData.compatibilities,
    );

    if (existentCompatibilities === undefined) {
      existentCompatibilities = [];
    }

    const existentCompatibilitiesNames = existentCompatibilities.map(
      (compatibility: Compatibility) => compatibility.name,
    );

    const addCompatibilityNames = petData.compatibilities
      .filter(
        compatibility =>
          !existentCompatibilitiesNames.includes(String(compatibility.name)),
      )
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCompatibilities = await this.compatibilitiesRepository.create(
      addCompatibilityNames,
    );

    const finalCompatibilities = [
      ...newCompatibilities,
      ...existentCompatibilities,
    ];

    pet.headquarter = headquarter;
    pet.avatar = petData.pet.avatar;
    pet.name = petData.pet.name;
    pet.type = petData.pet.type;
    pet.breed = petData.pet.breed;
    pet.size = petData.pet.size;
    pet.age = petData.pet.age;
    pet.gender = petData.pet.gender;
    pet.description = petData.pet.description;
    pet.energy = petData.pet.energy;
    pet.active = petData.pet.active;
    pet.expires_at = petData.pet.expires_at;
    pet.pet_compatibilities = finalCompatibilities.map(compatibility =>
      Object.assign(new PetsCompatibilities(), {
        compatibility_id: compatibility.id,
        pet_id: id,
        name: compatibility.name,
      }),
    );

    return this.petsRepository.save(pet);
  }
}

export default UpdatePetService;
