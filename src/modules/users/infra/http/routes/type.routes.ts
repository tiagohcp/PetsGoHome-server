import { Router } from 'express';

import TypeController from '../controllers/TypeController';

import ensureAUthenticated from '../middlewares/ensureAuthenticated';

const typeRouter = Router();

const typeController = new TypeController();

typeRouter.use(ensureAUthenticated);

typeRouter.put('/', typeController.update);

export default typeRouter;
