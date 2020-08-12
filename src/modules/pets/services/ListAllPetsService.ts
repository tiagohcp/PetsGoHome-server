import { injectable, inject } from 'tsyringe';

import IPetsRepository from '../repositories/IPetsRepository';
import Pet from '../infra/typeorm/entities/Pet';

interface IRequest {
  hq_id: string;
}

@injectable()
class ListAllPetsService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({ hq_id }: IRequest): Promise<Pet[]> {
    console.log('***ListAllPetsService.execute.hq_id ', hq_id);
    const pets = await this.petsRepository.findAllPets({
      hq_id,
    });

    return pets;
  }
}

export default ListAllPetsService;
