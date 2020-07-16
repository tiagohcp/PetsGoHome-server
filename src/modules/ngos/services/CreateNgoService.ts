import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviser';
import INgosRepository from '../repositories/INgosRepository';

import Ngo from '../infra/typeorm/entities/Ngo';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateNgoService {
  constructor(
    @inject('NgosRepository')
    private NgosRepository: INgosRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Ngo> {
    const checkNgoExists = await this.NgosRepository.findByEmail(email);

    if (checkNgoExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const ngo = await this.NgosRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return ngo;
  }
}

export default CreateNgoService;
