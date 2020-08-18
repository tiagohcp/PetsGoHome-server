import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import IPetAvatarsRepository from '../repositories/IPetAvatarsRepository';
import PetAvatar from '../infra/typeorm/entities/PetAvatar';
import IPetAvatar from '../dtos/ICreatePetAvatarDTO';

interface IRequest {
  hq_id: string;
  petAvatars: IPetAvatar[];
}
@injectable()
class UpdateMainPetAvatarService {
  constructor(
    @inject('PetAvatarsRepository')
    private petAvatarsRepository: IPetAvatarsRepository,

    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute(
    avatarsData: IRequest,
    pet_id: string,
    user_id: string,
  ): Promise<PetAvatar[]> {
    const headquarter = await this.headquartersRepository.findById(
      avatarsData.hq_id,
    );

    if (headquarter === undefined) {
      throw new AppError('Headquarter is not cadastred.');
    }

    if (headquarter.user_id !== user_id) {
      throw new AppError(
        'Only can delete a avatar in a pet in your own headquarter.',
      );
    }

    const existentPetAvatars = await this.petAvatarsRepository.findByIds(
      avatarsData.petAvatars.map(petAvatar => petAvatar.id || ''),
    );

    if (!existentPetAvatars || existentPetAvatars.length < 2) {
      throw new AppError('Some informed Avatar are not cadastred.');
    }

    const updatedPetAvatars = await this.petAvatarsRepository.save(
      existentPetAvatars.map(petAvatar => {
        return {
          ...petAvatar,
          main: !petAvatar.main,
        };
      }),
    );

    return updatedPetAvatars;
  }
}

export default UpdateMainPetAvatarService;
