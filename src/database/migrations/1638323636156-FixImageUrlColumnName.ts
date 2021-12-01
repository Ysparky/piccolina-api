import {MigrationInterface, QueryRunner} from "typeorm";

export class FixImageUrlColumnName1638323636156 implements MigrationInterface {
    name = 'FixImageUrlColumnName1638323636156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "imageUrl" TO "image_url"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "image_url" TO "imageUrl"`);
    }

}
