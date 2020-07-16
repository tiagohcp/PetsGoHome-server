import { Router } from 'express';
import ngosRouter from '@modules/ngos/infra/http/routes/ngos.routes';
import adoptersRouter from '@modules/adopters/infra/http/routes/adopters.routes';
// import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/ngos', ngosRouter);
routes.use('/adopters', adoptersRouter);
// routes.use('/sessions', sessionsRouter);

export default routes;
