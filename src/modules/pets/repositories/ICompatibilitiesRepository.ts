import ICreateCompatibilityDTO from '@modules/pets/dtos/ICreateCompatibilityDTO';
import Compatibility from '../infra/typeorm/entities/Compatibility';

export default interface ICompatibilitiesRepository {
  findByName(
    names: ICreateCompatibilityDTO[],
  ): Promise<Compatibility[] | undefined>;
  create(names: ICreateCompatibilityDTO[]): Promise<Compatibility[]>;
  save(compatibilities: Compatibility[]): Promise<Compatibility[]>;
}
