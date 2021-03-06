import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAUthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAUthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
