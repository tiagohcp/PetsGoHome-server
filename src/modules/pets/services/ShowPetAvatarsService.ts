import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPetAvatarsRepository from '../repositories/IPetAvatarsRepository';
import PetAvatar from '../infra/typeorm/entities/PetAvatar';

@injectable()
class ShowPetAvatarsService {
  constructor(
    @inject('PetAvatarsRepository')
    private petAvatarsRepository: IPetAvatarsRepository,
  ) {}

  public async execute(pet_id: string): Promise<PetAvatar[]> {
    const existentPetAvatars = await this.petAvatarsRepository.findByPetId(
      pet_id,
    );

    if (!existentPetAvatars) {
      throw new AppError('Pet has not a Avatar cadastred.');
    }

    return existentPetAvatars;
  }
}

export default ShowPetAvatarsService;
