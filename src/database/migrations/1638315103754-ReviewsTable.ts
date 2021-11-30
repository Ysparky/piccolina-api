import {MigrationInterface, QueryRunner} from "typeorm";

export class ReviewsTable1638315103754 implements MigrationInterface {
    name = 'ReviewsTable1638315103754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "comment" character varying(255) NOT NULL, "rating" numeric(10,2) NOT NULL DEFAULT '0', "flag" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" integer, "customer_id" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "flag" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, "product_id" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_910d46f0ab3b071255bedd1732b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_003e599a9fc0e8f154b6313639f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_003e599a9fc0e8f154b6313639f"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_910d46f0ab3b071255bedd1732b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
