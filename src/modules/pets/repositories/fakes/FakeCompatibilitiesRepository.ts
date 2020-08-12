import { uuid } from 'uuidv4';

import ICompatibilitiesRepository from '@modules/pets/repositories/ICompatibilitiesRepository';
import ICreateCompatibilityDTO from '@modules/pets/dtos/ICreateCompatibilityDTO';

import Compatibility from '@modules/pets/infra/typeorm/entities/Compatibility';

class FakeCompatibilitiesRepository implements ICompatibilitiesRepository {
  private compatibilities: Compatibility[] = [];

  public async findByName(
    names: ICreateCompatibilityDTO[],
  ): Promise<Compatibility[] | undefined> {
    const compatibilitiesNames = names.map(name => name.name);

    const findCompatibilities = this.compatibilities.filter(compatibility =>
      compatibilitiesNames.includes(compatibility.name),
    );

    if (findCompatibilities.length < 1) {
      return undefined;
    }

    return findCompatibilities;
  }

  public async create(
    names: ICreateCompatibilityDTO[],
  ): Promise<Compatibility[]> {
    const addCompatibilities: Compatibility[] = [];
    names.forEach(name => {
      const compatibility = new Compatibility();

      Object.assign(compatibility, { id: uuid() }, name);

      this.compatibilities.push(compatibility);
      addCompatibilities.push(compatibility);
    });

    return addCompatibilities;
  }

  public async save(
    compatibilities: Compatibility[],
  ): Promise<Compatibility[]> {
    const updatedCompatibilities: Compatibility[] = [];
    compatibilities.forEach(compatibility => {
      const findIndex = this.compatibilities.findIndex(
        findCompatibility => findCompatibility.id === compatibility.id,
      );

      this.compatibilities[findIndex] = compatibility;
      updatedCompatibilities.push(compatibility);
    });

    return updatedCompatibilities;
  }
}

export default FakeCompatibilitiesRepository;
