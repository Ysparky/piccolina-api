import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkersColumnWithSnakeNaming1638400140546 implements MigrationInterface {
    name = 'WorkersColumnWithSnakeNaming1638400140546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "workers" ADD "last_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workers" ADD "image_url" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "workers" ADD "imageUrl" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workers" ADD "lastName" character varying(255) NOT NULL`);
    }

}
