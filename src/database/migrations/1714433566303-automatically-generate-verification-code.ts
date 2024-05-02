import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutomaticallyGenerateVerificationCode
  implements MigrationInterface
{
  name = 'v0.0.12-automatically-generate-verification-code-1714433566303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
    await queryRunner.query(
      `ALTER TABLE "verification" ADD CONSTRAINT "UQ_c9f10e6cbbd3544da3a9c802f60" UNIQUE ("code")`,
    );
    await queryRunner.query(
      'ALTER TABLE "verification" ALTER COLUMN "code" TYPE TEXT',
    );
    await queryRunner.query(
      `ALTER TABLE "verification" ALTER COLUMN "code" SET DEFAULT gen_random_bytes(128)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verification" ALTER COLUMN "code" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "verification" DROP CONSTRAINT "UQ_c9f10e6cbbd3544da3a9c802f60"`,
    );
    await queryRunner.query(
      'ALTER TABLE "verification" ALTER COLUMN "code" TYPE VARCHAR(256)',
    );
    await queryRunner.query(`DROP EXTENSION IF EXISTS pgcrypto`);
  }
}
