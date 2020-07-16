import Adopter from '../infra/typeorm/entities/Adopter';
import ICreateAdopterDTO from '../dtos/ICreateAdopterDTO';

export default interface IAdopterRepositories {
  findById(id: string): Promise<Adopter | undefined>;
  findByEmail(email: string): Promise<Adopter | undefined>;
  create(data: ICreateAdopterDTO): Promise<Adopter>;
  save(adopter: Adopter): Promise<Adopter>;
}
