import { Router } from 'express';
// Temos que importar o AuthenticateUsersService.ts aqui
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// // Essa parte foi adicionada depois de "routes.use('/appointments', appointmentsRouter);" do arquivo index.ts
// // Agora, se formos criar uma rota para criar um agendamento(uma rota do tipo post), não precisamos colocar "/appointments". Podemos escrever simplesmente "/". Isto porque utilizamos "routes.use"
sessionsRouter.post('/', async (request, response) => {
  try {
    // Vamos precisar de email e senha para fazer a autenticação.
    const { email, password } = request.body;

    // Aqui, vamos instanciar o AuthenticateUserService
    const authenticateUser = new AuthenticateUserService();

    // Pegando agora a resposta. // Vamos deletar informações do password do usuário que acabou de ser criado
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // Deletando informações do password
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// // Vamos exportar a variável appointementesRouter
export default sessionsRouter;
