import Headquarter from '../infra/typeorm/entities/Headquarter';
import ICreateHeadquarterDTO from '../dtos/ICreateHeadquarterDTO';
import IFindAllHeadquartersDTO from '../dtos/IFindAllHeadquartersDTO';

export default interface IHeadquartersRepository {
  findAllHeadquarters(data: IFindAllHeadquartersDTO): Promise<Headquarter[]>;
  findById(id: string): Promise<Headquarter | undefined>;
  findByIdentification(
    identification: string,
  ): Promise<Headquarter | undefined>;
  create(data: ICreateHeadquarterDTO): Promise<Headquarter>;
  save(headquarter: Headquarter): Promise<Headquarter>;
}
