import { getRepository, Repository } from 'typeorm';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import ICreateHeadquarterDTO from '@modules/headquarters/dtos/ICreateHeadquarterDTO';

import IFindAllHeadquartersDTO from '@modules/headquarters/dtos/IFindAllHeadquartersDTO';
import Headquarter from '../entities/Headquarter';

class HeadquartersRepository implements IHeadquartersRepository {
  private ormRepository: Repository<Headquarter>;

  constructor() {
    this.ormRepository = getRepository(Headquarter);
  }

  public async findById(id: string): Promise<Headquarter | undefined> {
    const headquarter = await this.ormRepository.findOne(id);

    return headquarter;
  }

  public async findByIdentification(
    identification: string,
  ): Promise<Headquarter | undefined> {
    const headquarter = await this.ormRepository.findOne({
      where: { identification },
    });

    return headquarter;
  }

  public async findAllHeadquarters({
    user_id,
  }: IFindAllHeadquartersDTO): Promise<Headquarter[]> {
    let headquarters: Headquarter[];

    if (user_id) {
      headquarters = await this.ormRepository.find({
        where: {
          user_id,
        },
        order: {
          name: 'ASC',
        },
      });
    } else {
      headquarters = await this.ormRepository.find();
    }
    return headquarters;
  }

  public async create(
    headquarterData: ICreateHeadquarterDTO,
  ): Promise<Headquarter> {
    const headquarter = this.ormRepository.create(headquarterData);

    await this.ormRepository.save(headquarter);

    return headquarter;
  }

  public async save(headquarter: Headquarter): Promise<Headquarter> {
    return this.ormRepository.save(headquarter);
  }
}

export default HeadquartersRepository;
