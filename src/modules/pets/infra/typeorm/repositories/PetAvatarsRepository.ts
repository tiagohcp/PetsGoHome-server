import { getRepository, Repository, In } from 'typeorm';

import IPetAvatarsRepository from '@modules/pets/repositories/IPetAvatarsRepository';
import ICreatePetAvatarDTO from '@modules/pets/dtos/ICreatePetAvatarDTO';

import PetAvatar from '@modules/pets/infra/typeorm/entities/PetAvatar';

class PetAvatarsRepository implements IPetAvatarsRepository {
  private ormRepository: Repository<PetAvatar>;

  constructor() {
    this.ormRepository = getRepository(PetAvatar);
  }

  public async findByIds(ids: string[]): Promise<PetAvatar[] | undefined> {
    const petAvatars = this.ormRepository.find({
      where: {
        id: In(ids),
      },

      order: {
        main: 'DESC',
      },
    });

    return petAvatars;
  }

  public async findByPetId(pet_id: string): Promise<PetAvatar[] | undefined> {
    const petAvatars = this.ormRepository.find({
      where: { pet_id },
      order: {
        main: 'DESC',
      },
    });

    return petAvatars;
  }

  public async findByAvatar(avatar: string): Promise<PetAvatar | undefined> {
    const avatarName = avatar;

    const petAvatar = await this.ormRepository.findOne({
      where: {
        avatar: avatarName,
      },
    });

    return petAvatar;
  }

  public async create(
    petAvatars: ICreatePetAvatarDTO[],
    pet_id: string,
  ): Promise<PetAvatar[]> {
    const newPetAvatars: PetAvatar[] = [];

    petAvatars.map(petAvatar => {
      const avatar = this.ormRepository.create({
        pet_id,
        avatar: petAvatar.avatar,
        main: petAvatar.main,
      });

      newPetAvatars.push(avatar);

      return true;
    });

    await this.ormRepository.save(newPetAvatars);

    return newPetAvatars;
  }

  public async save(petAvatars: PetAvatar[]): Promise<PetAvatar[]> {
    return this.ormRepository.save(petAvatars);
  }

  public async delete(id: string): Promise<void> {
    const petAvatar = this.ormRepository.findOne(id);

    if (petAvatar) {
      await this.ormRepository.delete(id);
    }
  }
}

export default PetAvatarsRepository;
