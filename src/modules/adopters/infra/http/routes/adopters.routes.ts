import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';

import AdoptersController from '../controllers/AdoptersController';
// import AdopterAvatarController from '../controllers/AdopterAvatarController';

// import ensureAUthenticated from '../middlewares/ensureAuthenticated';

const adoptersRouter = Router();

const adoptersController = new AdoptersController();
// const adopterAvatarController = new AdopterAvatarController();

// const upload = multer(uploadConfig);

adoptersRouter.post('/', adoptersController.create);

// adoptersRouter.patch(
//   '/avatar',
//   ensureAUthenticated,
//   upload.single('avatar'),
//   adopterAvatarController.update,
// );

export default adoptersRouter;
