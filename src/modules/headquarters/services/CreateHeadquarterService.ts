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
  about: string;
  latitude: number;
  longitude: number;
}

@injectable()
class CreateHeadquarterService {
  constructor(
    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,

    @inject('IdentificatorValidator')
    private identificatorValidator: IIdentificatorValidator,
  ) {}

  public async execute(headquarterData: IRequest): Promise<Headquarter> {
    const isValid = await this.identificatorValidator.validateIdentidicator(
      headquarterData.identification,
    );

    if (!isValid) {
      throw new AppError('Identificator invalid!');
    }

    const checkHeadquarterExists = await this.headquartersRepository.findByIdentification(
      headquarterData.identification,
    );

    if (checkHeadquarterExists) {
      throw new AppError('Identificator already cadastred.');
    }

    const headquarter = await this.headquartersRepository.create(
      headquarterData,
    );

    return headquarter;
  }
}

export default CreateHeadquarterService;
