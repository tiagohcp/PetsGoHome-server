import { container } from 'tsyringe';

import './providers';

import INgosRepository from '@modules/ngos/repositories/INgosRepository';
import NgosRepository from '@modules/ngos/infra/typeorm/repositories/NgosRepository';

import IAdoptersRepository from '@modules/adopters/repositories/IAdoptersRepository';
import AdoptersRepository from '@modules/adopters/infra/typeorm/repositories/AdoptersRepository';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// container.registerSingleton<IUsersRepository>(
//   'UsersRepository',
//   UsersRepository,
// );

container.registerSingleton<INgosRepository>('NgosRepository', NgosRepository);
container.registerSingleton<IAdoptersRepository>(
  'AdoptersRepository',
  AdoptersRepository,
);
