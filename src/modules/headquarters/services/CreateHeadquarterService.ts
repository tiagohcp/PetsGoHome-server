import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/models/IIdentificatorValidator';

import IHeadquartersRepository from '../repositories/IHeadquartersRepository';
import Headquarter from '../infra/typeorm/entities/Headquarter';

interface IRequest {
  user_id: string;
  name: string;
  identification: string;
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

    @inject('IdentificatorValidator')
    private identificatorValidator: IIdentificatorValidator,
  ) {}

  public async execute({
    user_id,
    name,
    identification,
    zipcode,
    address,
    number,
    neighborhood,
    city,
    state,
    whatsapp,
  }: IRequest): Promise<Headquarter> {
    const isValid = await this.identificatorValidator.validateIdentidicator(
      identification,
    );

    if (!isValid) {
      throw new AppError('Identificator invalid!');
    }

    const checkHeadquarterExists = await this.headquartersRepository.findByIdentification(
      identification,
    );

    if (checkHeadquarterExists) {
      throw new AppError('Identificator already cadastred.');
    }

    const headquarter = await this.headquartersRepository.create({
      user_id,
      name,
      identification,
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
