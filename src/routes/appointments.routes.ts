import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
// Após a instalação de "yarn add date-fns", vamos fazer importação
import { parseISO } from 'date-fns';

// Importamos o nosso "AppointmentsRepository.ts" aqui
import AppointmentsRepository from '../repositories/AppointmentsRepository';
// Importamos o arquivo "CreateAppointmentService.ts"
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Como todas as rotas de agendamento precisam de autenticação nas rotas, então vamos aplicar o middleware em todas as rotas de agendamento
appointmentsRouter.use(ensureAuthenticated);

// Rota criada para listar os agendamentos(appointments)
// Vamos precisar criar um método (all) lá no arquivo "AppointmentsRepository.ts" responsável por fornecer todos os dados do agendamento
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  // Após importar "getCustomRepository" fazemos:
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  // Durante a criação da rota de listagem de appointments (GET) percebemos que no momento que nós formos precisar de informação de appointments temos sempre que "conectar" com o repositório (appointmentRepository).
  const appointments = await appointmentsRepository.find();

  // Temos que retornar agora os "appointments" recebidos.
  return response.json(
    appointments,
  ); /* Para o teste no insomnia, colocar o retorno do get */
});

// // Essa parte foi adicionada depois de "routes.use('/appointments', appointmentsRouter);" do arquivo index.ts
// // Agora, se formos criar uma rota para criar um agendamento(uma rota do tipo post), não precisamos colocar "/appointments". Podemos escrever simplesmente "/". Isto porque utilizamos "routes.use"
appointmentsRouter.post('/', async (request, response) => {
  try {
    // Eu vou pegar de dentro de "request.body", os dados que o usuário vai precisar para fazer o agendamento. Quais dados? R.: provider=cabeleireiro e a date=horário
    const { provider_id, date } = request.body;

    // Convertendo a data e passando ela para parsedDate
    const parsedDate = parseISO(date);

    // Criamos o "createAppointment" para poder passsar o "appointmentsRepository" que é o parâmetro do "constructor" lá do arquivo "CreateAppointmentService.ts".
    // Tudo que diz respeito a regra/lógica de negócio colocamos o "service"(no arquivo CreateAppointmenteService). E para acessessá-la, além de fazer a importação do arquivo, precisamos instanciar "CreateAppointmentService".
    // O "CreateAppointmentService()"" já tem o "ppointmentsRepository"
    const createAppointment = new CreateAppointmentService();

    // appointment é o agendamento que estamos querendo criar. Aqui, estamos executando o nosso "service", ou seja, o nosso  "const appointment = this.appointmentsRepository.create({provider, date: appointmentDate,  });" do arquivo "CreateAppointmentService".
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    // Retornando o agora o nosso agendamento "appointment" criado
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// // Vamos exportar a variável appointementesRouter
export default appointmentsRouter;
