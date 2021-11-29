import {MigrationInterface, QueryRunner} from "typeorm";

export class CookingTimeForProducts1638187870521 implements MigrationInterface {
    name = 'CookingTimeForProducts1638187870521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "cooking_time" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "cooking_time"`);
    }

}
