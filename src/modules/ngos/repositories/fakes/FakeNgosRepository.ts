import { uuid } from 'uuidv4';

import INgoRepository from '@modules/ngos/repositories/INgosRepository';
import ICreateNgoDTO from '@modules/ngos/dtos/ICreateNgoDTO';

import Ngo from '@modules/ngos/infra/typeorm/entities/Ngo';

class NgosRepository implements INgoRepository {
  private ngos: Ngo[] = [];

  public async findById(id: string): Promise<Ngo | undefined> {
    const findNgo = this.ngos.find(ngo => ngo.id === id);

    return findNgo;
  }

  public async findByEmail(email: string): Promise<Ngo | undefined> {
    const findNgo = this.ngos.find(ngo => ngo.email === email);

    return findNgo;
  }

  public async create(ngoData: ICreateNgoDTO): Promise<Ngo> {
    const ngo = new Ngo();

    Object.assign(ngo, { id: uuid() }, ngoData);

    this.ngos.push(ngo);

    return ngo;
  }

  public async save(ngo: Ngo): Promise<Ngo> {
    const findIndex = this.ngos.findIndex(findNgo => findNgo.id === ngo.id);

    this.ngos[findIndex] = ngo;

    return ngo;
  }
}

export default NgosRepository;
