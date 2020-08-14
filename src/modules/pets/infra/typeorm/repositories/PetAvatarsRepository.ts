import { getRepository, Repository } from 'typeorm';

import IPetAvatarsRepository from '@modules/pets/repositories/IPetAvatarsRepository';
import ICreatePetAvatarDTO from '@modules/pets/dtos/ICreatePetAvatarDTO';

import PetAvatar from '@modules/pets/infra/typeorm/entities/PetAvatar';

class PetAvatarsRepository implements IPetAvatarsRepository {
  private ormRepository: Repository<PetAvatar>;

  constructor() {
    this.ormRepository = getRepository(PetAvatar);
  }

  public async findByPetId(pet_id: string): Promise<PetAvatar[] | undefined> {
    const petAvatars = this.ormRepository.find({
      where: { pet_id },
    });

    return petAvatars;
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

    return newPetAvatars;
  }

  public async save(petAvatars: PetAvatar[]): Promise<PetAvatar[]> {
    return this.ormRepository.save(petAvatars);
  }

  public async delete(id: string): Promise<void> {
    const petAvatar = this.ormRepository.findOne(id);

    if (petAvatar) {
      this.ormRepository.delete(id);
    }
  }
}

export default PetAvatarsRepository;
