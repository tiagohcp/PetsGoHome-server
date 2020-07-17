import { getRepository, Repository } from 'typeorm';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import ICreateHeadquarterDTO from '@modules/headquarters/dtos/ICreateHeadquarterDTO';

import Headquarter from '../entities/Headquarter';

class HeadquartersRepository implements IHeadquartersRepository {
  private ormRepository: Repository<Headquarter>;

  constructor() {
    this.ormRepository = getRepository(Headquarter);
  }

  public async create({
    user_id,
    name,
    zipcode,
    address,
    number,
    neighborhood,
    city,
    state,
    whatsapp,
  }: ICreateHeadquarterDTO): Promise<Headquarter> {
    const headquarter = this.ormRepository.create({
      user_id,
      name,
      zipcode,
      address,
      number,
      neighborhood,
      city,
      state,
      whatsapp,
    });

    await this.ormRepository.save(headquarter);

    return headquarter;
  }
}

export default HeadquartersRepository;
