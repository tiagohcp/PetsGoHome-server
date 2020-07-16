import Adopter from '@modules/adopters/infra/typeorm/entities/Adopter';
import Ngo from '@modules/ngos/infra/typeorm/entities/Ngo';
import ICreateUserDTO from '@shared/dtos/ICreateUserDTO';

export default interface INgoRepositories {
  findById(id: string): Promise<Ngo | Adopter | undefined>;
  findByEmail(email: string): Promise<Ngo | Adopter | undefined>;
  create(data: ICreateUserDTO): Promise<Ngo | Adopter>;
  save(user: Ngo | Adopter): Promise<Ngo | Adopter>;
}
