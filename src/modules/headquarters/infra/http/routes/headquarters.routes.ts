/* eslint-disable  */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAccess from '@modules/users/infra/http/middlewares/ensureAccess';
import HeadquarterController from '../controllers/HeadquarterController';

const headquarterRouter = Router();
const headquarterController = new HeadquarterController();

headquarterRouter.use(ensureAuthenticated);
headquarterRouter.use(ensureAccess),


// headquarterRouter.get('/', async (request, response) => {
//   const headquarter = await headquarterRepository.find();

//   return response.json(headquarter);
// });

headquarterRouter.post('/', headquarterController.create);

export default headquarterRouter;
