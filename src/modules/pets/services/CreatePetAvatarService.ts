import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import IPetAvatarsRepository from '../repositories/IPetAvatarsRepository';
import PetAvatar from '../infra/typeorm/entities/PetAvatar';

interface IRequest {
  hq_id: string;
  petAvatars: [
    {
      avatar: string;
      main: boolean;
    },
  ];
}

@injectable()
class CreatePetAvatarService {
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
        'Only can upload a avatar in a pet in your own headquarter.',
      );
    }

    let existentPetAvatars = await this.petAvatarsRepository.findByPetId(
      pet_id,
    );

    if (existentPetAvatars === undefined) {
      existentPetAvatars = [];
    }

    const hasExistentMain = existentPetAvatars.find(
      existentPetAvatar => existentPetAvatar.main === true,
    );

    const existentPetAvatarsNames = existentPetAvatars.map(
      (petAvatar: PetAvatar) => petAvatar.avatar,
    );

    const addPetAvatars = avatarsData.petAvatars
      .filter(petAvatar => !existentPetAvatarsNames.includes(petAvatar.avatar))
      .filter((value, index, self) => self.indexOf(value) === index);

    const hasNewMain = addPetAvatars.find(
      addPetAvatar => addPetAvatar.main === true,
    );

    if (!hasExistentMain && !hasNewMain) {
      throw new AppError('Must have been an main avatar');
    }

    const newPetAvatars = await this.petAvatarsRepository.create(
      addPetAvatars,
      pet_id,
    );

    const finalPetAvatars = [...newPetAvatars, ...existentPetAvatars];

    return finalPetAvatars;
  }
}

export default CreatePetAvatarService;
