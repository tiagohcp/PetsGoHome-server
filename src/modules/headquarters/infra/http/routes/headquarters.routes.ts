import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAccess from '@modules/users/infra/http/middlewares/ensureAccess';
import HeadquarterController from '../controllers/HeadquarterController';
import HeadquarterInformationController from '../controllers/HeadquarterInformationController';
import HeadquarterPetsController from '../controllers/HeadquarterPetsController';

const headquarterRouter = Router();
const headquarterController = new HeadquarterController();
const headquarterInformationController = new HeadquarterInformationController();
const headquarterPetsController = new HeadquarterPetsController();

headquarterRouter.use(ensureAuthenticated);
headquarterRouter.use(ensureAccess);

headquarterRouter.post('/', headquarterController.create);
headquarterRouter.get('/', headquarterController.index);
headquarterRouter.get('/pets/:headquarter_id', headquarterPetsController.index);
headquarterRouter.get('/owned', headquarterInformationController.index);
headquarterRouter.get(
  '/:headquarter_id',
  headquarterInformationController.show,
);
headquarterRouter.put(
  '/:headquarter_id',
  headquarterInformationController.update,
);

headquarterRouter.get(
  '/pets/:headquarter_id',
  headquarterInformationController.show,
);

export default headquarterRouter;
