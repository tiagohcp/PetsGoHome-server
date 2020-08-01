import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import typeRouter from '@modules/users/infra/http/routes/type.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import headquartersRouter from '@modules/headquarters/infra/http/routes/headquarters.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/type', typeRouter);
routes.use('/password', passwordRouter);
routes.use('/headquarters', headquartersRouter);

export default routes;
