import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAccess from '@modules/users/infra/http/middlewares/ensureAccess';
import PetController from '../controllers/PetController';

const petRouter = Router();
const petController = new PetController();

petRouter.use(ensureAuthenticated);
petRouter.use(ensureAccess);

petRouter.post('/', petController.create);
petRouter.put('/:pet_id', petController.update);
// petRouter.delete('/:pet_id', petController.delete);
petRouter.get('/:pet_id', petController.show);

export default petRouter;
