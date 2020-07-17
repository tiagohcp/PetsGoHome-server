import Headquarter from '../infra/typeorm/entities/Headquarter';
import ICreateHeadquarterDTO from '../dtos/ICreateHeadquarterDTO';

export default interface IHeadquartersRepository {
  findById(id: string): Promise<Headquarter | undefined>;
  findByIdentification(
    identification: string,
  ): Promise<Headquarter | undefined>;
  create(data: ICreateHeadquarterDTO): Promise<Headquarter>;
}
