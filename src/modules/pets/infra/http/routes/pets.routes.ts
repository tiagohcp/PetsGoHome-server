import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAccess from '@modules/users/infra/http/middlewares/ensureAccess';
import PetController from '../controllers/PetController';

const petRouter = Router();
const petController = new PetController();

petRouter.use(ensureAuthenticated);
petRouter.use(ensureAccess);

petRouter.post('/', petController.create);
// petRouter.get('/', petController.index);
// petRouter.get('/owned', petInformationController.index);
petRouter.get('/:headquarter_id', petController.index);

export default petRouter;
