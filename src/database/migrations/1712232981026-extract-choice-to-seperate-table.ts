import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtractChoiceToSeparateTable implements MigrationInterface {
  name = 'v0.0.3-extract-choice-to-separate-table-1712232981026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_416e62ff89a730bef045f6f8933"`,
    );
    await queryRunner.query(
      `CREATE TABLE "choice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "content" character varying, "is_correct" boolean NOT NULL, "question_id" uuid, CONSTRAINT "PK_5bf2e5939332f46711278a87fcd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "chosen_answer"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "chapter_id"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "answer_a"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "answer_b"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "answer_c"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "answer_d"`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP COLUMN "correct_answer"`,
    );
    await queryRunner.query(`DROP TYPE "public"."answer_enum"`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "choice_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_749885cb1ae5482f4a25e978baa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "chapter_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "choice" ADD CONSTRAINT "FK_d8ff1fcd448c6843621f423d077" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_3fd948de88641ecef00b348a16d" FOREIGN KEY ("choice_id") REFERENCES "choice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_749885cb1ae5482f4a25e978baa" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_749885cb1ae5482f4a25e978baa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_3fd948de88641ecef00b348a16d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "choice" DROP CONSTRAINT "FK_d8ff1fcd448c6843621f423d077"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "chapter_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_749885cb1ae5482f4a25e978baa" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "choice_id"`);
    await queryRunner.query(
      `CREATE TYPE "public"."answer_enum" AS ENUM('A', 'B', 'C', 'D')`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "correct_answer" "public"."answer_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "answer_d" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "answer_c" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "answer_b" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "answer_a" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "answer" ADD "chapter_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "chosen_answer" "public"."answer_enum" NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "choice"`);
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_416e62ff89a730bef045f6f8933" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
