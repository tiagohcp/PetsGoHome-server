import Pet from '../infra/typeorm/entities/Pet';
import ICreatePetDTO from '../dtos/ICreatePetDTO';
import IFindAllPetsDTO from '../dtos/IFindAllPetsDTO';

export default interface IPetsRepository {
  findAllPets(data: IFindAllPetsDTO): Promise<Pet[]>;
  findById(id: string): Promise<Pet | undefined>;
  findByFilter(type: 'dog' | 'cat'): Promise<Pet[] | undefined>;
  create(data: ICreatePetDTO): Promise<Pet>;
  save(pet: Pet): Promise<Pet>;
}
