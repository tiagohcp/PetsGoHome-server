import { injectable, inject } from 'tsyringe';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import AppError from '@shared/errors/AppError';
import IHeadquartersRepository from '../repositories/IHeadquartersRepository';
// import Headquarter from '../infra/typeorm/entities/Headquarter';

interface IRequest {
  hq_id: string;
}

@injectable()
class ListOwnedPetsService {
  constructor(
    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute({ hq_id }: IRequest): Promise<Pet[]> {
    console.log('***ListAllPetsService.execute.hq_id ', hq_id);
    const headquarter = await this.headquartersRepository.findById(hq_id);

    if (headquarter) {
      return headquarter.pets;
    }

    throw new AppError('Headquarter is not cadastred.');
  }
}

export default ListOwnedPetsService;
