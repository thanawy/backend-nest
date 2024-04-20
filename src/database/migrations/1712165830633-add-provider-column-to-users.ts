import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProviderColumnToUsers implements MigrationInterface {
  name = 'v0.0.2-add-provider-column-to-users-1712165830633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
            ADD "provider" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "provider"`);
  }
}
