import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHeadquartersRepository from '../repositories/IHeadquartersRepository';
import Headquarter from '../infra/typeorm/entities/Headquarter';

interface IRequest {
  id: string;
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
class UpdateHeadquarterService {
  constructor(
    @inject('HeadquartersRepository')
    private headquartersRepository: IHeadquartersRepository,
  ) {}

  public async execute(headquarterData: IRequest): Promise<Headquarter> {
    const headquarter = await this.headquartersRepository.findById(
      headquarterData.id,
    );

    if (!headquarter) {
      throw new AppError('Headquarter not found');
    }

    if (headquarter.identification !== headquarterData.identification) {
      throw new AppError("Identificator can't be changed!");
    }

    headquarter.id = headquarterData.id;
    headquarter.user_id = headquarterData.user_id;
    headquarter.name = headquarterData.name;
    headquarter.identification = headquarterData.identification;
    headquarter.zipcode = headquarterData.zipcode;
    headquarter.address = headquarterData.address;
    headquarter.number = headquarterData.number;
    headquarter.neighborhood = headquarterData.neighborhood;
    headquarter.city = headquarterData.city;
    headquarter.state = headquarterData.state;
    headquarter.whatsapp = headquarterData.whatsapp;
    headquarter.about = headquarterData.about;
    headquarter.latitude = headquarterData.latitude;
    headquarter.longitude = headquarterData.longitude;

    return this.headquartersRepository.save(headquarter);
  }
}

export default UpdateHeadquarterService;
