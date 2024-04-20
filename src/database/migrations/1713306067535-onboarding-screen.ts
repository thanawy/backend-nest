import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnboardingScreen implements MigrationInterface {
  name = 'v0.0.6-onboarding-screen-1713306067535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "onboarding_screen"
             (
                 "id"          uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                 "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                 "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                 "deleted_at"  TIMESTAMP WITH TIME ZONE,
                 "order"       integer                  NOT NULL,
                 "title"       character varying        NOT NULL,
                 "description" character varying        NOT NULL,
                 "img"         character varying        NOT NULL,
                 CONSTRAINT "PK_d1e197a257ada8e8763abb060ab" PRIMARY KEY ("id")
             )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "onboarding_screen"`);
  }
}
