// import { uuid } from 'uuidv4';
// importamos o "Entity" da "typeorm"
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Importando a classa User para poder criar a propriedade "provider: User"
import User from './User';

// A nossa primeira Entidade de AGENDAMENTO. Vamos escrevé-la no formato do CLASSE
@Entity('appointments')
class Appointment {
  // Aqui dentro vou colocar os campos do Appointment/Agendamento
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string; /* O profissional que vai atender */

  // Criamos a propriedade provider. E o tipo dessa propriedade será uma instancia da classa "User".
  // Como temos agora um relacionamento entre o agendamento e o usuário, nós vamos estipular dentro dessa classe qual que é o relacionamento. No SQL temos: OneToOne(1 usuário tem 1 agendamento), OneToMany(1 usuário tem vários agendamento), ManytoMany(mais de um prestador de serviço pudesse participar do mesmo serviço. muitos usuários participam de um mesmo agendamento);
  // Quantos usuários o meu appointment tem?R.: 1 prestador de serviço; Quantos serviços um usuário pode prestar?R.: Muitos.
  // Como estamos aqui no Appointment, então vamos partir do Appointment, ou seja, vamos fazer o inverso(ManytoOne); E precisamos dentro uma função que retorna qual que é o model que ele deve utilizar quando a variável "provider: User" for chamada.
  @ManyToOne(() => User) /* Está na documentação do typeorm */
  // Vamos colocar uma propriedade chamada "joinColumn". E temos que importá-la também.
  @JoinColumn({
    name: 'provider_id',
  }) /* quual é a coluna que vai identificar qual é o usuário/(prestador do agendamento) logo em baixo */
  provider: User;

  @Column('timestamp with time zone')
  date: Date; /* Horário de atendimento */

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
// Vou dar um export aqui para que esta classe fique disponível externamente
export default Appointment;

/* Se não estivéssimos utilizando o "decorator" teriamos que fazer algo do tipo:
export default Entity(Appointment)
*/

// O método "constructor" serve para: quando escrevermos "new constructor()", poder passar alguns parâmentros para dentro de parenteses e assim poder criar o Appointment baseada em informações preexistentes
