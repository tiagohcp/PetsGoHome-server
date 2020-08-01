import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  user_type: 'ngo' | 'adopter';
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class UpdateTypeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, user_type }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.type = user_type;

    await this.usersRepository.save(user);

    const { secret, expiresIn } = authConfig.jwt;

    const subj = user.id.concat('*#*').concat(user.type);

    const token = sign({}, secret, {
      subject: subj,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default UpdateTypeService;
