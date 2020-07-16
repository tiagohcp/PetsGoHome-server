import { getRepository, Repository } from 'typeorm';

import IAdoptersRepository from '@modules/adopters/repositories/IAdoptersRepository';
import ICreateAdopterDTO from '@modules/adopters/dtos/ICreateAdopterDTO';

import Adopter from '../entities/Adopter';

class AdoptersRepository implements IAdoptersRepository {
  private ormRepository: Repository<Adopter>;

  constructor() {
    this.ormRepository = getRepository(Adopter);
  }

  public async findById(id: string): Promise<Adopter | undefined> {
    const adopter = await this.ormRepository.findOne(id);

    return adopter;
  }

  public async findByEmail(email: string): Promise<Adopter | undefined> {
    const adopter = await this.ormRepository.findOne({
      where: { email },
    });

    return adopter;
  }

  public async create(AdopterData: ICreateAdopterDTO): Promise<Adopter> {
    const adopter = this.ormRepository.create(AdopterData);

    await this.ormRepository.save(adopter);

    return adopter;
  }

  public async save(adopter: Adopter): Promise<Adopter> {
    return this.ormRepository.save(adopter);
  }
}

export default AdoptersRepository;
