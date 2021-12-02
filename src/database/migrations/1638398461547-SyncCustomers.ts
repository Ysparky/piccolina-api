import {MigrationInterface, QueryRunner} from "typeorm";

export class SyncCustomers1638398461547 implements MigrationInterface {
    name = 'SyncCustomers1638398461547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "image_url" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "imageUrl" character varying(255) NOT NULL`);
    }

}
