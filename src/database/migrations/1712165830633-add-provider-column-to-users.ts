import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProviderColumnToUsers1712165830633 implements MigrationInterface {
    name = 'AddProviderColumnToUsers1712165830633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
    }

}
