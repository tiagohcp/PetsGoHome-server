import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePetsCompatibilities1594863887333
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pets_compatibilities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pet_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'compatibility_id',
            type: 'uuid',
            isNullable: true,
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
        foreignKeys: [
          {
            name: 'PetsPetsCompatibilities',
            columnNames: ['pet_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pets',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'CompatibilitiesPetsCompatibilities',
            columnNames: ['compatibility_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'compatibilities',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets_compatibilities');
  }
}
