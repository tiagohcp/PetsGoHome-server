import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '../repositories/IHeadquartersRepository';
import Headquarter from '../infra/typeorm/entities/Headquarter';

@injectable()
class ShowHeadquarterService {
  constructor(
    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute(id: string): Promise<Headquarter> {
    const headquarter = await this.headquartersRepository.findById(id);

    if (!headquarter) {
      throw new AppError('Headquarter not found');
    }

    return headquarter;
  }
}

export default ShowHeadquarterService;
