import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAuthColumns implements MigrationInterface {
  name = 'v0.0.9-add-classes-units-and-lessons-1713617268326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
            ADD "provider_id" character varying`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD CONSTRAINT "UQ_5e3a2b86fd9a9c22c266ae04731" UNIQUE ("provider_id", "provider")`);
    await queryRunner.query(
      `UPDATE "user"
             SET "provider_id" = "google_id"
             WHERE "provider" = 'google'`,
    );
    await queryRunner.query(
      `UPDATE "user"
             SET "provider_id" = "facebook_id"
             WHERE "provider" = 'google'`,
    );
    await queryRunner.query(`ALTER TABLE "user"
            DROP CONSTRAINT "UQ_189473aaba06ffd667bb024e71a"`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "facebook_id"`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP CONSTRAINT "UQ_7adac5c0b28492eb292d4a93871"`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "google_id"`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD "email_verified_at" TIMESTAMP WITH TIME ZONE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "email_verified_at"`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD "google_id" character varying`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD CONSTRAINT "UQ_7adac5c0b28492eb292d4a93871" UNIQUE ("google_id")`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD "facebook_id" character varying`);
    await queryRunner.query(`ALTER TABLE "user"
            ADD CONSTRAINT "UQ_189473aaba06ffd667bb024e71a" UNIQUE ("facebook_id")`);
    await queryRunner.query(`UPDATE "user"
                                 SET "facebook_id" = "provider_id"
                                 WHERE "provider" = 'facebook'`);
    await queryRunner.query(`UPDATE "user"
                                 SET "google_id" = "provider_id"
                                 WHERE "provider" = 'google'`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP CONSTRAINT "UQ_5e3a2b86fd9a9c22c266ae04731"`);
    await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "provider_id"`);
  }
}
