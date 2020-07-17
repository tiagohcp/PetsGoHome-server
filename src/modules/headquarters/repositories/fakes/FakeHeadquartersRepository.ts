import { uuid } from 'uuidv4';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import ICreateHeadquarterDTO from '@modules/headquarters/dtos/ICreateHeadquarterDTO';

import Headquarter from '@modules/headquarters/infra/typeorm/entities/Headquarter';

class HeadquartersRepository implements IHeadquartersRepository {
  private headquarters: Headquarter[] = [];

  public async findById(id: string): Promise<Headquarter | undefined> {
    const findHeadquarter = this.headquarters.find(
      headquarter => headquarter.id === id,
    );

    return findHeadquarter;
  }

  public async findByIdentification(
    identification: string,
  ): Promise<Headquarter | undefined> {
    const findHeadquarter = this.headquarters.find(
      headquarter => headquarter.identification === identification,
    );

    return findHeadquarter;
  }

  public async create(
    headquarterData: ICreateHeadquarterDTO,
  ): Promise<Headquarter> {
    const headquarter = new Headquarter();

    Object.assign(headquarter, { id: uuid() }, headquarterData);

    this.headquarters.push(headquarter);

    return headquarter;
  }
}

export default HeadquartersRepository;
