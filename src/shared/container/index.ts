import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IHeadquartersRepository from '@modules/headquarters/repositories/IHeadquartersRepository';
import HeadquartersRepository from '@modules/headquarters/infra/typeorm/repositories/HeadquartersRepository';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import PetsRepository from '@modules/pets/infra/typeorm/repositories/PetsRepository';

import ICompatibilitiesRepository from '@modules/pets/repositories/ICompatibilitiesRepository';
import CompatibilitiesRepository from '@modules/pets/infra/typeorm/repositories/CompatibilitiesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IHeadquartersRepository>(
  'HeadquartersRepository',
  HeadquartersRepository,
);

container.registerSingleton<IPetsRepository>('PetsRepository', PetsRepository);

container.registerSingleton<ICompatibilitiesRepository>(
  'CompatibilitiesRepository',
  CompatibilitiesRepository,
);
