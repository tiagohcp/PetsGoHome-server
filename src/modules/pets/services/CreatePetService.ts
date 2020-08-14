import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import IPetsRepository from '../repositories/IPetsRepository';
import ICompatibilitiesRepository from '../repositories/ICompatibilitiesRepository';
import ICompatibility from '../dtos/ICreateCompatibilityDTO';
import Pet from '../infra/typeorm/entities/Pet';
import Compatibility from '../infra/typeorm/entities/Compatibility';

interface IRequest {
  pet: {
    hq_id: string;
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
class CreatePetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,

    @inject('CompatibilitiesRepository')
    private compatibilitiesRepository: ICompatibilitiesRepository,

    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute(petData: IRequest, user_id: string): Promise<Pet> {
    const headquarter = await this.headquartersRepository.findById(
      petData.pet.hq_id,
    );

    if (headquarter === undefined) {
      throw new AppError('Headquarter is not cadastred.');
    }

    if (headquarter.user_id !== user_id) {
      throw new AppError('Only can create a pet in your own headquarter.');
    }

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

    const pet = await this.petsRepository.create({
      headquarter,
      pet: petData.pet,
      compatibilities: finalCompatibilities.map(compatibility => ({
        compatibility_id: compatibility.id,
        name: compatibility.name,
      })),
    });

    return pet;
  }
}

export default CreatePetService;
