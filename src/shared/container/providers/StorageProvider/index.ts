import { container } from 'tsyringe';
import uploadCofig from '@config/upload';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHachProvider from '@modules/users/providers/HashProvider/implementations/BCriptHashProvider';

import IIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/models/IIdentificatorValidator';
import JoiIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/implementations/JoiIdentificatorValidator';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', BCryptHachProvider);

container.registerSingleton<IIdentificatorValidator>(
  'IdentificatorValidator',
  JoiIdentificatorValidator,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadCofig.driver],
);
