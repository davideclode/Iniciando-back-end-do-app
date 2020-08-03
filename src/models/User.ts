// import { uuid } from 'uuidv4';
// importamos o "Entity" da "typeorm"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// A nossa primeira Entidade de AGENDAMENTO. Vamos escrevé-la no formato do CLASSE
@Entity('users')
class User {
  // Aqui dentro vou colocar os campos do Appointment/Agendamento
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; /* O profissional que vai atender */

  @Column()
  email: string;
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
// Vou dar um export aqui para que esta classe fique disponível externamente
export default User;

/* Se não estivéssimos utilizando o "decorator" teriamos que fazer algo do tipo:
export default Entity(Appointment)
*/

// O método "constructor" serve para: quando escrevermos "new constructor()", poder passar alguns parâmentros para dentro de parenteses e assim poder criar o Appointment baseada em informações preexistentes
