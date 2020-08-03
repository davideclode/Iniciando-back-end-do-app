import { uuid } from 'uuidv4';
import {MigrationInterface, QueryRunner, Table, CreateDateColumn, UpdateDateColumn} from "typeorm";

// Aqui nós vamos criar a instrução que vai criar a tabela no nosso BANCO DE DADOS

export default class CreateAppointments1595804445728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          // Aqui vamos passar algumas propriedades para a nossa tabela
          name: 'appointments', /* Este é o nome da nossa tabela */
          columns: [
            {
              name: 'id', /* Nome dessa coluna */
              type: 'uuid',/* isto porque no arquivo "Appointment.ts" estamos utilizando this.id=uuid(). Se não usariamos "int" */
              isPrimary: true,
              generationStrategy: 'uuid', /* Gerar o compo id de forma automárica */
              default: 'uuid_generate_v4()',
            },
            {
              name: 'provider', /* Nome dessa coluna */
              type: 'varchar',
              // isNullable: false, /* Significa que não é possível ter esse campo como nulo */
            },
            {
              name: 'date',/* Nome dessa coluna */
              type: 'timestamp with time zone', /* Se não estivermos usando postgress então ficaria só: timestamp */
              // isNullable: false, /* Por padrão isso já é false */
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // Aqui, vamos deletar a nossa tabela
      await queryRunner.dropTable('appointments');
    }

}
