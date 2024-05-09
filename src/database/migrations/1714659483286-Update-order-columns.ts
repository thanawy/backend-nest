import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderColumns implements MigrationInterface {
    name = 'v0.0.13-update-order-columns-1714659483286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "recurring_token" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "token_object" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "order" ADD "transaction_details" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" boolean NOT NULL DEFAULT false`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "transaction_details"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "token_object"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "recurring_token"`);
    }

}
