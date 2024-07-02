import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAuthConstraints implements MigrationInterface {
  name = 'v0.0.10-update-auth-constraints-1714320075301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "unit"
            DROP CONSTRAINT "FK_cac7772512e16a8cbbeea5a91ca"`);
    await queryRunner.query(`ALTER TABLE "unit"
            ADD CONSTRAINT "FK_6464ffb6caafd7fed788367f472" FOREIGN KEY ("subject_id") REFERENCES "subject" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP CONSTRAINT "UQ_5e3a2b86fd9a9c22c266ae04731"`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD CONSTRAINT "UQ_dd13e2801d2073391f346a58ae1" UNIQUE ("provider", "provider_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "unit"
            DROP CONSTRAINT "FK_6464ffb6caafd7fed788367f472"`);
    await queryRunner.query(`ALTER TABLE "unit"
            ADD CONSTRAINT "FK_cac7772512e16a8cbbeea5a91ca" FOREIGN KEY ("subject_id") REFERENCES "subject" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP CONSTRAINT "UQ_dd13e2801d2073391f346a58ae1"`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD CONSTRAINT "UQ_5e3a2b86fd9a9c22c266ae04731" UNIQUE ("provider", "provider_id")`);
  }
}
