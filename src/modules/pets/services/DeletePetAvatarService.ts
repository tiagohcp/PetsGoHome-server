import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import IPetAvatarsRepository from '../repositories/IPetAvatarsRepository';
import IPetAvatar from '../dtos/ICreatePetAvatarDTO';

interface IRequest {
  hq_id: string;
  petAvatars: IPetAvatar[];
}

@injectable()
class DeletePetAvatarService {
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
  ): Promise<void> {
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

    const petAvatar = await this.petAvatarsRepository.findByAvatar(
      avatarsData.petAvatars[0].avatar,
    );

    if (!petAvatar) {
      throw new AppError('The avatar does not exist');
    }

    if (petAvatar.main === true) {
      throw new AppError('Can not delete a main avatar');
    }

    await this.petAvatarsRepository.delete(petAvatar.id);
  }
}

export default DeletePetAvatarService;
