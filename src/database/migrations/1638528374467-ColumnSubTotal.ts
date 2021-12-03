import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnSubTotal1638528374467 implements MigrationInterface {
    name = 'ColumnSubTotal1638528374467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "sub_total"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "sub_total" numeric(9,3) NOT NULL`);
    }

}
