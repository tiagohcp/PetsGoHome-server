import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IHashProvider from './HashProvider/models/IHashProviser';
import BCryptHachProvider from './HashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHachProvider);
