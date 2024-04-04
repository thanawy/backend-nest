import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration implements MigrationInterface {
    name = 'v0.0.1-initial-migration-1711551772424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "description" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."answer_enum" AS ENUM('A', 'B', 'C', 'D')`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "chosen_answer" "public"."answer_enum" NOT NULL, "solution_duration" integer NOT NULL, "user_id" uuid, "question_id" uuid, "chapter_id" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "chapter_id" uuid NOT NULL, "description" character varying NOT NULL, "answer_a" character varying NOT NULL, "answer_b" character varying NOT NULL, "answer_c" character varying NOT NULL, "answer_d" character varying NOT NULL, "correct_answer" "public"."answer_enum" NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chapter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "subject_id" uuid, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "program" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "division" character varying NOT NULL, CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "facebook_id" character varying, "google_id" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "display_name" character varying, "country_code" character varying, "phone_number" character varying, "role" character varying NOT NULL DEFAULT 'student', "program_id" uuid, "subscription_id" uuid, CONSTRAINT "UQ_189473aaba06ffd667bb024e71a" UNIQUE ("facebook_id"), CONSTRAINT "UQ_7adac5c0b28492eb292d4a93871" UNIQUE ("google_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "REL_ec4e57f4138e339fb111948a16" UNIQUE ("subscription_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" character varying, "price" double precision NOT NULL, "currency" character varying, "duration" integer NOT NULL, "is_free" boolean NOT NULL DEFAULT false, "is_couponed" boolean NOT NULL DEFAULT false, "notice_period" integer, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "recurring_token" character varying NOT NULL, "next_renewal" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "plan_id" uuid, CONSTRAINT "REL_940d49a105d50bbd616be54001" UNIQUE ("user_id"), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_tag" ("question_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_1b280c31469075075860df9d6b0" PRIMARY KEY ("question_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1908d5b6571f3154cda55a134" ON "question_tag" ("question_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd2136aacc58fb57e8ee17b684" ON "question_tag" ("tag_id") `);
        await queryRunner.query(`CREATE TABLE "question_collection" ("question_id" uuid NOT NULL, "collection_id" uuid NOT NULL, CONSTRAINT "PK_b9947597d9987678a100e0aa524" PRIMARY KEY ("question_id", "collection_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5eb835210f7d4e610f1eeb3b31" ON "question_collection" ("question_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f3f31e2ffe2b550436d974047" ON "question_collection" ("collection_id") `);
        await queryRunner.query(`CREATE TABLE "program_subject" ("program_id" uuid NOT NULL, "subject_id" uuid NOT NULL, CONSTRAINT "PK_0a4de9c70e3c87a9e561dc94127" PRIMARY KEY ("program_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71d5a245ea8a708c1cc303bf0a" ON "program_subject" ("program_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3321e25af675736554263e6260" ON "program_subject" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_add8ab72aec4ce5eb87fdc2740d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_416e62ff89a730bef045f6f8933" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_749885cb1ae5482f4a25e978baa" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_cac7772512e16a8cbbeea5a91ca" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ab02fb05fe2e9b1e6ebaead78ed" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ec4e57f4138e339fb111948a16f" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_tag" ADD CONSTRAINT "FK_c1908d5b6571f3154cda55a1346" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_tag" ADD CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_collection" ADD CONSTRAINT "FK_5eb835210f7d4e610f1eeb3b31b" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_collection" ADD CONSTRAINT "FK_6f3f31e2ffe2b550436d9740476" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "program_subject" ADD CONSTRAINT "FK_71d5a245ea8a708c1cc303bf0a4" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "program_subject" ADD CONSTRAINT "FK_3321e25af675736554263e6260f" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "program_subject" DROP CONSTRAINT "FK_3321e25af675736554263e6260f"`);
        await queryRunner.query(`ALTER TABLE "program_subject" DROP CONSTRAINT "FK_71d5a245ea8a708c1cc303bf0a4"`);
        await queryRunner.query(`ALTER TABLE "question_collection" DROP CONSTRAINT "FK_6f3f31e2ffe2b550436d9740476"`);
        await queryRunner.query(`ALTER TABLE "question_collection" DROP CONSTRAINT "FK_5eb835210f7d4e610f1eeb3b31b"`);
        await queryRunner.query(`ALTER TABLE "question_tag" DROP CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845"`);
        await queryRunner.query(`ALTER TABLE "question_tag" DROP CONSTRAINT "FK_c1908d5b6571f3154cda55a1346"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ec4e57f4138e339fb111948a16f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ab02fb05fe2e9b1e6ebaead78ed"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_cac7772512e16a8cbbeea5a91ca"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_749885cb1ae5482f4a25e978baa"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_416e62ff89a730bef045f6f8933"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_add8ab72aec4ce5eb87fdc2740d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3321e25af675736554263e6260"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71d5a245ea8a708c1cc303bf0a"`);
        await queryRunner.query(`DROP TABLE "program_subject"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f3f31e2ffe2b550436d974047"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5eb835210f7d4e610f1eeb3b31"`);
        await queryRunner.query(`DROP TABLE "question_collection"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd2136aacc58fb57e8ee17b684"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1908d5b6571f3154cda55a134"`);
        await queryRunner.query(`DROP TABLE "question_tag"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "plan"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "program"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TYPE "public"."answer_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
