import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProviser';
import BCryptHachProvider from '@modules/users/providers/HashProvider/implementations/BCriptHashProvider';

import IIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/models/IIdentificatorValidator';
import JoiIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/implementations/JoiIdentificatorValidator';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHachProvider);

container.registerSingleton<IIdentificatorValidator>(
  'IdentificatorValidator',
  JoiIdentificatorValidator,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
