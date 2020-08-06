import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1596217043150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Colocamos aqui a tabela(appointment) e a coluna(provider) que queremos alterar/deletar
    await queryRunner.dropColumn('appointments', 'provider');
    // Colocamos aqui a coluna que a gente quer criar
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid', // O typeorm suporta uuid4
        isNullable: true,
      }),
    );
    // Como estamos lidando como um banco relacional então precisamos de chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        // Damos um nome específico para a nossa chave estrangeira
        name: 'AppointmentProvider',
        // Colocamos aqui qual ou quais colunas vai/vão receber a chave estrangeira
        columnNames: ['provider_id'],
        // colocamos aqui o nome da coluna, na tabela usuário, que vai representar/ser relacionado ao "provider_id"
        referencedColumnNames: ['id'],
        // colocamos também o nome da tabela que vai fazer referência a esse campo
        referencedTableName: 'users',
        // O que vai acontecer com o agendamento do usuário, caso o usuário for deletado.
        // Se o usuário for deletado, todos os seus agendamentos serão deletados.
        onDelete: 'SET NULL',
        // Caso o id do usuário for alterado, isso tem que refletir no seu relacionamento(Para não precisarmos fazer isso pela aplicação)
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Aqui vamos desfazer na ordem reversa.
    // 1º Deletamos a chave estrangeira
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    // 2º Deletados a coluna "provider_id"
    await queryRunner.dropColumn('appointments', 'provider_id');
    // 3º Agora preciso criar a coluna provider de volta. Que é a coluna no formato de string.
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}

// export default AlterProviderFieldToProviderId1596217043150;
