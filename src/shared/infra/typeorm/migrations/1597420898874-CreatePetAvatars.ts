import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePetAvatars1597420898874
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet_avatars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'avatar',
            type: 'varchar',
          },
          {
            name: 'pet_id',
            type: 'uuid',
          },
          {
            name: 'main',
            type: 'boolean',
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
            name: 'AvatarPet',
            referencedTableName: 'pets',
            referencedColumnNames: ['id'],
            columnNames: ['pet_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pet_avatars');
  }
}
