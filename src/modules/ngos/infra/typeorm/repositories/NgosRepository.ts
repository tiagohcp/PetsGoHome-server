import { getRepository, Repository } from 'typeorm';

import INgosRepository from '@modules/ngos/repositories/INgosRepository';
import ICreateNgoDTO from '@modules/ngos/dtos/ICreateNgoDTO';

import Ngo from '../entities/Ngo';

class NgosRepository implements INgosRepository {
  private ormRepository: Repository<Ngo>;

  constructor() {
    this.ormRepository = getRepository(Ngo);
  }

  public async findById(id: string): Promise<Ngo | undefined> {
    const ngo = await this.ormRepository.findOne(id);

    return ngo;
  }

  public async findByEmail(email: string): Promise<Ngo | undefined> {
    const ngo = await this.ormRepository.findOne({
      where: { email },
    });

    return ngo;
  }

  public async create(NgoData: ICreateNgoDTO): Promise<Ngo> {
    const ngo = this.ormRepository.create(NgoData);

    await this.ormRepository.save(ngo);

    return ngo;
  }

  public async save(ngo: Ngo): Promise<Ngo> {
    return this.ormRepository.save(ngo);
  }
}

export default NgosRepository;
