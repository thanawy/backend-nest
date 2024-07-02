import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationTable implements MigrationInterface {
  name = 'v0.0.11-add-verification-1714320382271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "verification"
                                 (
                                     "id"         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                     "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                     "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                     "deleted_at" TIMESTAMP WITH TIME ZONE,
                                     "code"       character varying(256)   NOT NULL,
                                     "user_id"    uuid,
                                     CONSTRAINT "REL_49cf5e171603b309b419485046" UNIQUE ("user_id"),
                                     CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY ("id")
                                 )`);
    await queryRunner.query(`ALTER TABLE "verification"
            ADD CONSTRAINT "FK_49cf5e171603b309b4194850461" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "verification"
            DROP CONSTRAINT "FK_49cf5e171603b309b4194850461"`);
    await queryRunner.query(`DROP TABLE "verification"`);
  }
}
