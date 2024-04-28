import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1713602596293 implements MigrationInterface {
    name = 'v0.0.8-create-orders-table-and-their-foreign-keys-1713602596293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "order_id" character varying NOT NULL, "user_id" uuid, "plan_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_61715cf54431641e60fb2800049" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_61715cf54431641e60fb2800049"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
