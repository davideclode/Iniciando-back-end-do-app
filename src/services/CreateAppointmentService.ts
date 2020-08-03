// Esse serviço será responsável só pela criação de agendamentos
//Princípios aplicados: Single Responsability Principle, Dependency Inversion

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'

// Poderia ser "RequestDTO"
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  // O "service" vai ter um único método dentro dele(execute). Se estamos criando um appointment, então temos que retornar um appointment. Logo: "execute({}):Promise<Appointment>". Esse método deve ser público porque precisa ser chamado de fora da classe.
  public async execute( {provider_id, date}:Request ): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    /* A partir de agora, o "appointmentsRepository" tem todos os métodos que precisamos para executar */

    // O "startOfhour" vai inicializar tudo com os zeros
    const appointmentDate = startOfHour(date);

    // Dois agendamentos não podem ser feitos no mesmo horário. Portanto, fazemos:
    // parsedDate é o que estamos recebendo do usuário
    // Depois de terminar a parte "public findByDate(date: Date):" do arquivo "AppointmentsRepository.ts", vamos fazer a verificação
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate, );

    // Quando "findAppointmentInSameDate" receber os agendamentos(appointments) que está dentro de " appointmentsRepository" pela data, então é a vez de fazer a verificação.
    if(findAppointmentInSameDate){
      // Como o nosso "service" não tem acesso ao "request" e nem o "response", o que podemos fazer no servive quando ele chegar num erro é realizar/dar um "throw" dentro de "Error".
      throw Error('Sorry🙁😢, this appointment is already booked!!!');
    }

    //  Depois de checar todas as condiçoes para ver se a data bateu ou não, passamos o "provider, date" para a nova variável "appointment". Como alteramos o "create" do arquivo "AppointmentsRepository.ts" agora não precisamos enviar os parâmetros "provider" e "date" separados por vírgula e sim como um objeto.
    // Obs.: Estamos criando o nosso agendamento
    const appointment = appointmentsRepository.create({
     // Agora podemos escrever o provider e o date
      provider_id,
      date: appointmentDate,
    });

    /* Não usamos o "await" no create isto porque o create só cria a instancia/objeto do nosso appointment mas ele não salva no banco de dados. Para salvar o nosso appointment no banco de dados fazemos: */
    await appointmentsRepository.save(appointment);

    // Precisamos retornar o nosso appointment para a rota ou qualquer outro arquivo que chamar o "service" depois.
    return appointment;
  }

}

export default CreateAppointmentService;
