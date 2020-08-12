import { getRepository, Repository, In } from 'typeorm';

import ICompatibilitiesRepository from '@modules/pets/repositories/ICompatibilitiesRepository';
import ICreateCompatibilityDTO from '@modules/pets/dtos/ICreateCompatibilityDTO';

import Compatibility from '@modules/pets/infra/typeorm/entities/Compatibility';

class CompatibilitiesRepository implements ICompatibilitiesRepository {
  private ormRepository: Repository<Compatibility>;

  constructor() {
    this.ormRepository = getRepository(Compatibility);
  }

  public async findByName(
    names: ICreateCompatibilityDTO[],
  ): Promise<Compatibility[] | undefined> {
    const compatibilitiesNames = names.map(compatibilityName =>
      String(compatibilityName.name),
    );

    const compatibilities = await this.ormRepository.find({
      where: {
        name: In(compatibilitiesNames),
      },
    });

    return compatibilities;
  }

  public async create(
    compatibilityData: ICreateCompatibilityDTO[],
  ): Promise<Compatibility[]> {
    const compatibilities = this.ormRepository.create(compatibilityData);

    await this.ormRepository.save(compatibilities);

    return compatibilities;
  }

  public async save(
    compatibilities: Compatibility[],
  ): Promise<Compatibility[]> {
    return this.ormRepository.save(compatibilities);
  }
}

export default CompatibilitiesRepository;
