import { uuid } from 'uuidv4';

import IPetAvatarsRepository from '@modules/pets/repositories/IPetAvatarsRepository';
import ICreatePetAvatarDTO from '@modules/pets/dtos/ICreatePetAvatarDTO';

import PetAvatar from '@modules/pets/infra/typeorm/entities/PetAvatar';

class FakePetAvatarsRepository implements IPetAvatarsRepository {
  private petAvatars: PetAvatar[] = [];

  public async findByPetId(pet_id: string): Promise<PetAvatar[] | undefined> {
    const findAvatars = this.petAvatars.filter(
      petAvatar => petAvatar.pet_id === pet_id,
    );

    return findAvatars;
  }

  public async findByAvatar(
    avatars: ICreatePetAvatarDTO[],
  ): Promise<PetAvatar[] | undefined> {
    const avatarsNames = avatars.map(avatar => avatar.avatar);

    const findAvatars = this.petAvatars.filter(petAvatar =>
      avatarsNames.includes(petAvatar.avatar),
    );

    if (findAvatars.length < 1) {
      return undefined;
    }

    return findAvatars;
  }

  public async create(
    petAvatars: ICreatePetAvatarDTO[],
    pet_id: string,
  ): Promise<PetAvatar[]> {
    const addPetAvatars: PetAvatar[] = [];
    petAvatars.map(petAvatar => {
      const newPetAvatars = new PetAvatar();
      Object.assign(newPetAvatars, { id: uuid() }, { pet_id }, petAvatar);

      this.petAvatars.push(newPetAvatars);
      addPetAvatars.push(newPetAvatars);

      return true;
    });

    return addPetAvatars;
  }

  public async save(petAvatars: PetAvatar[]): Promise<PetAvatar[]> {
    const updatedPetAvatars: PetAvatar[] = [];
    petAvatars.map(petAvatar => {
      const findIndex = this.petAvatars.findIndex(
        findPetAvatar => findPetAvatar.id === petAvatar.id,
      );

      this.petAvatars[findIndex] = petAvatar;
      updatedPetAvatars.push(petAvatar);

      return true;
    });

    return updatedPetAvatars;
  }

  public async delete(id: string): Promise<void> {
    const removedPetAvatarIndex = this.petAvatars.findIndex(
      petAvatar => petAvatar.id === id,
    );

    if (removedPetAvatarIndex) {
      this.petAvatars.splice(removedPetAvatarIndex, 1);
    }
  }
}

export default FakePetAvatarsRepository;
