import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRBAC implements MigrationInterface {
    name = 'v0.0.4-create-rbac-1712237919397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "action" character varying, "resource" character varying, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("role_id_1" uuid NOT NULL, "role_id_2" uuid NOT NULL, CONSTRAINT "PK_8e3ce890e54fa81fd0498166b29" PRIMARY KEY ("role_id_1", "role_id_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_67602e264a32825070bb36cea8" ON "role_permissions" ("role_id_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed96fafe4e1824040c7960a641" ON "role_permissions" ("role_id_2") `);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_67602e264a32825070bb36cea86" FOREIGN KEY ("role_id_1") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_ed96fafe4e1824040c7960a6412" FOREIGN KEY ("role_id_2") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_ed96fafe4e1824040c7960a6412"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_67602e264a32825070bb36cea86"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed96fafe4e1824040c7960a641"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67602e264a32825070bb36cea8"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
