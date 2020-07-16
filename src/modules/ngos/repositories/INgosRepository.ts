import Ngo from '../infra/typeorm/entities/Ngo';
import ICreateNgoDTO from '../dtos/ICreateNgoDTO';

export default interface INgoRepositories {
  findById(id: string): Promise<Ngo | undefined>;
  findByEmail(email: string): Promise<Ngo | undefined>;
  create(data: ICreateNgoDTO): Promise<Ngo>;
  save(ngo: Ngo): Promise<Ngo>;
}
