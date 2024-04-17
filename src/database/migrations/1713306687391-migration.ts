import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClassesUnitsAndLessons implements MigrationInterface {
    name = 'v0.0.7-add-classes-units-and-lessons-1713306687391'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "class" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "unit_id" uuid, "class_id" uuid, "subject_id" uuid, "program_id" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chapter" RENAME TO "unit"`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "class_id" uuid`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_0b622f755860a2cf7fa684210fe" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_749885cb1ae5482f4a25e978baa"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME COLUMN "chapter_id" to "unit_id"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "lesson_id" uuid`);

        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_826015ed1c4d7024e9ea76aa1ed" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_c397c90bdcc63023dd8ca9233a6" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_aeaae22f4d629e1df4e54ca9695" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_26f1a9ba28a2edbb2439d94a4e0" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_f48adbc7f110c9444e6bc79df12" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_8be709902b1e0f219efa28d7389" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_8be709902b1e0f219efa28d7389"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_f48adbc7f110c9444e6bc79df12"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_26f1a9ba28a2edbb2439d94a4e0"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_aeaae22f4d629e1df4e54ca9695"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_c397c90bdcc63023dd8ca9233a6"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_826015ed1c4d7024e9ea76aa1ed"`);

        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "lesson_id"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME COLUMN "unit_id" to "chapter_id"`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_749885cb1ae5482f4a25e978baa" FOREIGN KEY ("chapter") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_0b622f755860a2cf7fa684210fe"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "class_id"`);
        await queryRunner.query(`ALTER TABLE "unit" RENAME TO "chapter"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "class"`);

    }
}
