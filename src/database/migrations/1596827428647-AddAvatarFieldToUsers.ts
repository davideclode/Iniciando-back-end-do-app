import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// Adicionando uma nova coluna na tabela já existente

export default class AddAvatarFieldToUsers1596827428647
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users', // Nome da tabela que queremos adicionar
      new TableColumn({
        name: 'avatar', // Nome do campo
        type: 'varchar', // Tipo do campo
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // "users" é o nome da tabela onde queremos adicionar a coluna "avatar"
    await queryRunner.dropColumn('users', 'avatar');
  }
}
