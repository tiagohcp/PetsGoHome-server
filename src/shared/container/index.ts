import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import HeadquartersRepository from '@modules/headquarters/infra/typeorm/repositories/HeadquartersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHeadquartersRepository>(
  'HeadquartersRepository',
  HeadquartersRepository,
);
