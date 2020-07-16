import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviser';
import IAdoptersRepository from '../repositories/IAdoptersRepository';

import Adopter from '../infra/typeorm/entities/Adopter';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateAdopterService {
  constructor(
    @inject('AdoptersRepository')
    private AdoptersRepository: IAdoptersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Adopter> {
    const checkAdopterExists = await this.AdoptersRepository.findByEmail(email);

    if (checkAdopterExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const adopter = await this.AdoptersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return adopter;
  }
}

export default CreateAdopterService;
