import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import Headquarter from '../infra/typeorm/entities/Headquarter';

import IHeadquartersRepository from '../repositories/IHeadquartersRepository';

interface IRequest {
  user_id: string;
  name: string;
  zipcode: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  whatsapp: string;
}

@injectable()
class CreateHeadquarterService {
  constructor(
    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    zipcode,
    address,
    number,
    neighborhood,
    city,
    state,
    whatsapp,
  }: IRequest): Promise<Headquarter> {
    const headquarter = await this.headquartersRepository.create({
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

    return headquarter;
  }
}

export default CreateHeadquarterService;
