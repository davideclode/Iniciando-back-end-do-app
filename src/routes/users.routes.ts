import { Router } from 'express';

// Temos que importar o CreateUsersService.ts aqui
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// // Essa parte foi adicionada depois de "routes.use('/appointments', appointmentsRouter);" do arquivo index.ts
// // Agora, se formos criar uma rota para criar um agendamento(uma rota do tipo post), não precisamos colocar "/appointments". Podemos escrever simplesmente "/". Isto porque utilizamos "routes.use"
usersRouter.post('/', async (request, response) => {
  try {
    // Para criar usuário vamos precisar de name, email e password
    const { name, email, password } = request.body;

    // Aqui, vamos instanciar o CreateUserService
    const createUser = new CreateUserService();

    // Utilizamos o "await" porque o nosso "execute()" é "async"
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Vamos deletar informações do password do usuário que acabou de ser criado
    delete user.password;

    return response.json(user);
    // return response.json(appointment);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

// // Vamos exportar a variável appointementesRouter
export default usersRouter;
