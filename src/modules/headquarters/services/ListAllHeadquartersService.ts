import { injectable, inject } from 'tsyringe';

import IHeadquartersRepository from '../repositories/IHeadquartersRepository';
import Headquarter from '../infra/typeorm/entities/Headquarter';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllHeadquartersService {
  constructor(
    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Headquarter[]> {
    const headquarters = await this.headquartersRepository.findAllHeadquarters({
      user_id,
    });

    return headquarters;
  }
}

export default ListAllHeadquartersService;
