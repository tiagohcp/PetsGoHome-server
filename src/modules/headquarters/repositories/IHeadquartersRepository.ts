import Headquarter from '../infra/typeorm/entities/Headquarter';
import ICreateHeadquarterDTO from '../dtos/ICreateHeadquarterDTO';

export default interface IHeadquartersRepository {
  create(data: ICreateHeadquarterDTO): Promise<Headquarter>;
}
