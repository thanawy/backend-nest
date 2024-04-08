import { MigrationInterface, QueryRunner } from "typeorm";

export class SetRoles implements MigrationInterface {
    name = 'v0.0.5-set-roles-1712546752235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "role" ("name") VALUES ('admin'), ('free-student'), ('premium-student'), ('teacher'), ('data-entry')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`UPDATE "user" SET "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'free-student') WHERE "role" = 'student'`);
        await queryRunner.query(`UPDATE "user" SET "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'premium-student') WHERE "role" = 'premium-student'`);
        await queryRunner.query(`UPDATE "user" SET "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'teacher') WHERE "role" = 'teacher'`);
        await queryRunner.query(`UPDATE "user" SET "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'admin') WHERE "role" = 'admin'`);
        await queryRunner.query(`UPDATE "user" SET "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'data-entry') WHERE "role" = 'data-entry'`);

        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying`);

        await queryRunner.query(`UPDATE "user" SET "role" = 'student' WHERE "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'free-student')`);
        await queryRunner.query(`UPDATE "user" SET "role" = 'premium-student' WHERE "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'premium-student')`);
        await queryRunner.query(`UPDATE "user" SET "role" = 'teacher' WHERE "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'teacher')`);
        await queryRunner.query(`UPDATE "user" SET "role" = 'admin' WHERE "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'admin')`);
        await queryRunner.query(`UPDATE "user" SET "role" = 'data-entry' WHERE "role_id" = (SELECT "id" FROM "role" WHERE "name" = 'data-entry')`);

        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);

        await queryRunner.query(`DELETE FROM "role" WHERE "name" = 'admin'`);
        await queryRunner.query(`DELETE FROM "role" WHERE "name" = 'free-student'`);
        await queryRunner.query(`DELETE FROM "role" WHERE "name" = 'premium-student'`);
        await queryRunner.query(`DELETE FROM "role" WHERE "name" = 'teacher'`);
        await queryRunner.query(`DELETE FROM "role" WHERE "name" = 'data-entry'`);
    }

}
