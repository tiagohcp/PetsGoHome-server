/* eslint-disable  */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAccess from '@modules/users/infra/http/middlewares/ensureAccess';
import HeadquarterController from '../controllers/HeadquarterController';
import HeadquarterInformationController from '../controllers/HeadquarterInformationController';

const headquarterRouter = Router();
const headquarterController = new HeadquarterController();
const headquarterInformationController = new HeadquarterInformationController();

headquarterRouter.use(ensureAuthenticated);
headquarterRouter.use(ensureAccess);

headquarterRouter.post('/', headquarterController.create);
headquarterRouter.get('/', headquarterController.index);
headquarterRouter.get('/:headquarter_id', headquarterInformationController.show);
headquarterRouter.put('/:headquarter_id', headquarterInformationController.update);

export default headquarterRouter;
