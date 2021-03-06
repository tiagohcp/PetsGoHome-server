import ICreatePetAvatarDTO from '@modules/pets/dtos/ICreatePetAvatarDTO';
import PetAvatar from '../infra/typeorm/entities/PetAvatar';

export default interface IPetAvatarsRepository {
  findByIds(ids: string[]): Promise<PetAvatar[] | undefined>;
  findByPetId(pet_id: string): Promise<PetAvatar[] | undefined>;
  findByAvatar(avatar: string): Promise<PetAvatar | undefined>;
  create(
    petAvatars: ICreatePetAvatarDTO[],
    pet_id: string,
  ): Promise<PetAvatar[]>;
  save(petAvatars: PetAvatar[]): Promise<PetAvatar[]>;
  delete(id: string): Promise<void>;
}
