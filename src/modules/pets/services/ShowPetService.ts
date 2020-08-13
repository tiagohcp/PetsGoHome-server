import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPetsRepository from '../repositories/IPetsRepository';
import Pet from '../infra/typeorm/entities/Pet';

interface IRequest {
  hq_id: string;
}

@injectable()
class ShowPetsService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute(id: string): Promise<Pet> {
    const pet = await this.petsRepository.findById(id);
    if (pet) {
      return pet;
    }

    throw new AppError('This pet is not existent.');
  }
}

export default ShowPetsService;
