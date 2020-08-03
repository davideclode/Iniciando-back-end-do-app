import {Router } from 'express';
// Vamos importar o arquivo/a rota appointments.routes.ts
import appointmentsRouter from './appointments.routes';
// Vamos importar o arquivo/a rota users.routes.ts aqui
import usersRouter from './users.routes';
// Vamos importar sessions.routes.ts
import sessionsRouter from './sessions.routes';

const routes = Router();

// Utilizamos o método "use" que vai fazer com que qualquer rota(independente do método get, post, etc) que inicia com "/appointments", "/users", eu vou repassar o que vem depois de /appointments/users para dentro de "appointmentsRouter"/usersRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);


export default routes;
