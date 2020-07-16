import { uuid } from 'uuidv4';

import IAdopterRepository from '@modules/adopters/repositories/IAdoptersRepository';
import ICreateAdopterDTO from '@modules/adopters/dtos/ICreateAdopterDTO';

import Adopter from '@modules/adopters/infra/typeorm/entities/Adopter';

class AdoptersRepository implements IAdopterRepository {
  private adopters: Adopter[] = [];

  public async findById(id: string): Promise<Adopter | undefined> {
    const findAdopter = this.adopters.find(adopter => adopter.id === id);

    return findAdopter;
  }

  public async findByEmail(email: string): Promise<Adopter | undefined> {
    const findAdopter = this.adopters.find(adopter => adopter.email === email);

    return findAdopter;
  }

  public async create(adopterData: ICreateAdopterDTO): Promise<Adopter> {
    const adopter = new Adopter();

    Object.assign(adopter, { id: uuid() }, adopterData);

    this.adopters.push(adopter);

    return adopter;
  }

  public async save(adopter: Adopter): Promise<Adopter> {
    const findIndex = this.adopters.findIndex(
      findAdopter => findAdopter.id === adopter.id,
    );

    this.adopters[findIndex] = adopter;

    return adopter;
  }
}

export default AdoptersRepository;
