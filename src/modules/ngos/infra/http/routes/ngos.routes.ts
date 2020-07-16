import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';

import NgosController from '../controllers/NgosController';
// import NgoAvatarController from '../controllers/NgoAvatarController';

// import ensureAUthenticated from '../middlewares/ensureAuthenticated';

const ngosRouter = Router();

const ngosController = new NgosController();
// const ngoAvatarController = new NgoAvatarController();

// const upload = multer(uploadConfig);

ngosRouter.post('/', ngosController.create);

// ngosRouter.patch(
//   '/avatar',
//   ensureAUthenticated,
//   upload.single('avatar'),
//   ngoAvatarController.update,
// );

export default ngosRouter;
