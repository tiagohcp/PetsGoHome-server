import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAccess from '@modules/users/infra/http/middlewares/ensureAccess';
import PetAvatarsController from '../controllers/PetAvatarsController';

const petRouter = Router();
const petAvatarsController = new PetAvatarsController();

petRouter.use(ensureAuthenticated);
petRouter.use(ensureAccess);

petRouter.put('/:pet_id', petAvatarsController.update);
petRouter.delete('/:pet_id', petAvatarsController.delete);
petRouter.get('/:pet_id', petAvatarsController.index);
petRouter.post('/:pet_id', petAvatarsController.create);

export default petRouter;
