import {MigrationInterface, QueryRunner} from "typeorm";

export class OrdersTableModule1638490485407 implements MigrationInterface {
    name = 'OrdersTableModule1638490485407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_status_log_status_enum" AS ENUM('NEW', 'CHECKOUT', 'PAID', 'FAILED', 'SHIPPED', 'DELIVERED', 'RETURNED', 'COMPLETE')`);
        await queryRunner.query(`CREATE TABLE "order_status_log" ("id" SERIAL NOT NULL, "status" "public"."order_status_log_status_enum" NOT NULL DEFAULT 'NEW', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" integer, CONSTRAINT "PK_cb57f320f79b86ff79cc2200630" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "sub_total" numeric(9,3) NOT NULL, "total_price" numeric(10,2) NOT NULL, "flag" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "location_id" integer, "customer_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_detail" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" integer, "order_id" integer, CONSTRAINT "PK_893f1d90444c486c31023ff1d8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expirationYear"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expirationMonth"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expiration_month" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expiration_year" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_status_log" ADD CONSTRAINT "FK_9198a9719572e9e2b880fedfed8" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_90e29013d1252e005e70beb4f46" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_detail" ADD CONSTRAINT "FK_b86d62e2c98b558e4acf531f9ef" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_detail" ADD CONSTRAINT "FK_5b0e6f7131af630c7ab92400fe0" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_detail" DROP CONSTRAINT "FK_5b0e6f7131af630c7ab92400fe0"`);
        await queryRunner.query(`ALTER TABLE "orders_detail" DROP CONSTRAINT "FK_b86d62e2c98b558e4acf531f9ef"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_90e29013d1252e005e70beb4f46"`);
        await queryRunner.query(`ALTER TABLE "order_status_log" DROP CONSTRAINT "FK_9198a9719572e9e2b880fedfed8"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expiration_year"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "expiration_month"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expirationMonth" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "expirationYear" smallint NOT NULL`);
        await queryRunner.query(`DROP TABLE "orders_detail"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_status_log"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_log_status_enum"`);
    }

}
