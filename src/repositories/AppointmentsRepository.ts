// Precisamos importar primeiro o nosso model/entidade de Appointment
import Appointment from '../models/Appointment';

// Vamos importar o EntityRepository e o Repository do typeorm
import { EntityRepository, Repository } from 'typeorm';

// Vamos criar o nosso repositório no formato de CLASSE
// O "AppointmentsRepository" Será responsável por "CRIAR", "ARMAZENAR", "LER", "DELETAR", "EDITAR" os dados de "Appointment" lá do arquivo "Appointments.ts"
/*O parâmetro do nosso "EntityRepository" vai ser o model "Appointment". Além disso, vamos dar um "extends Repository" para poder utilizar as propriedades do "Repository"*/
/* Nós só criamos o "@EntityRepository" porque temos um método a mais("findByDate"). Caso contrário utilizariamos o próprio repositório do typeorm. Nem precisariamos criar o arquivo de repositório(AppointmentsRepository) */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  // Criamos um novo método que vai encontrar um "appointments" em uma data específica. Caso contrário a função comentada "appointments.find" do arquivo "appointments.routs.ts" daria erros. Não conseguiriamos acessar "appointments" mesmo fazendo só "appointmentsRepository.appointments". Com isso ,resolvemos também mudar a função "appointments.find" do arquivo "appointments.routes.ts" para "appointmentsRepository.findByDate"
  // "findByDate" vai receber uma "data" e vai retornar um "Appointment" caso encontrar ou um "null" caso não encontrar.
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Vai tentar achar(findOne) se há uma data (date: date) iguar a data (date: Date) que está no "findByDate".  No "await this.findOne" estamos convertendo a busca por data específica utilizando SQL.
    const findAppointment = await this.findOne({
      where: { date: date }, /* poderiamos utilizar short sytax. seria "where: {data}," */
    })

    return findAppointment || null; /* || funciona como um "else" */
  }

}

// Exportando agora o AppointmentsRepository
export default AppointmentsRepository;
