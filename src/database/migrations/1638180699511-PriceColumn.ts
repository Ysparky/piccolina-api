import {MigrationInterface, QueryRunner} from "typeorm";

export class PriceColumn1638180699511 implements MigrationInterface {
    name = 'PriceColumn1638180699511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(2,0)`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "price"`);
    }

}
