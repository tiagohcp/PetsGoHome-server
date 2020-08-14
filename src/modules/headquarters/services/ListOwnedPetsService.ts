import { injectable, inject } from 'tsyringe';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import AppError from '@shared/errors/AppError';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
// import Pet from '../infra/typeorm/entities/Pet';

interface IRequest {
  hq_id: string;
}

@injectable()
class ListHeadquarterOwnedPetsService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({ hq_id }: IRequest): Promise<Pet[]> {
    const pets = await this.petsRepository.findByHeadquarter(hq_id);

    if (pets && pets.length > 0) {
      return pets;
    }

    throw new AppError('Headquarter has not a pet cadastred.');
  }
}

export default ListHeadquarterOwnedPetsService;
