import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import typeRouter from '@modules/users/infra/http/routes/type.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import headquartersRouter from '@modules/headquarters/infra/http/routes/headquarters.routes';
import petsRouter from '@modules/pets/infra/http/routes/pets.routes';
import petAvatarsRouter from '@modules/pets/infra/http/routes/petAvatars.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/type', typeRouter);
routes.use('/password', passwordRouter);
routes.use('/headquarters', headquartersRouter);
routes.use('/pets', petsRouter);
routes.use('/pets/avatars', petAvatarsRouter);

export default routes;
