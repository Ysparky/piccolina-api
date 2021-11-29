import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductsModule1638177675987 implements MigrationInterface {
    name = 'ProductsModule1638177675987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "flag" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE ("name"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(2) NOT NULL, "image_url" character varying NOT NULL, "flag" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "flag" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."table_status_enum" AS ENUM('Free', 'Reserved', 'Active')`);
        await queryRunner.query(`CREATE TABLE "table" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "status" "public"."table_status_enum" NOT NULL DEFAULT 'Free', "capacity" integer NOT NULL DEFAULT '4', "flag" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "flag" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_item" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "flag" boolean NOT NULL DEFAULT true, "menu_id" integer NOT NULL, "item_id" integer NOT NULL, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "summary" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "type" character varying NOT NULL, "flag" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "flag" boolean NOT NULL DEFAULT true, "item_id" integer NOT NULL, "ingredient_id" integer NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "price" integer NOT NULL, "cooking" boolean NOT NULL DEFAULT true, "quantity" integer, "unit" character varying, "flag" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "price" numeric(9,3) NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "flag" boolean NOT NULL DEFAULT true, "item_id" integer NOT NULL, "order_id" integer NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT '0', "subTotal" numeric(9,3) NOT NULL, "tax" numeric(9,3) NOT NULL, "shipping" numeric(9,3) NOT NULL, "total" numeric(9,3) NOT NULL, "flag" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "mobile" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "flag" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_table_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "booking_table" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "status" "public"."booking_table_status_enum" NOT NULL DEFAULT '0', "flag" boolean NOT NULL DEFAULT true, "table_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_a94fa9ec24555e2804f4558a08b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_ingredients" ("product_id" integer NOT NULL, "ingredient_id" integer NOT NULL, CONSTRAINT "PK_0224c1ad7fbe04747986bff9950" PRIMARY KEY ("product_id", "ingredient_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d358c1d1ec5c6c33c773647ffa" ON "products_ingredients" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_53ee83b6af2fad324bfcce6b0e" ON "products_ingredients" ("ingredient_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_d13308fb4357c972780ec7cf3b0" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_ac488fb5d877b66ec2e0dc7d7c5" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_bbaf66acc7e7c6dc3d1bc42a247" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_a13ac3f2cebdd703ac557c5377c" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_f9129a798f2308714d1e3be2463" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_table" ADD CONSTRAINT "FK_1cd0f4b428f07ac0e23c67ea40b" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_table" ADD CONSTRAINT "FK_b14ef4852452fbd8d38bca0052f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_ingredients" ADD CONSTRAINT "FK_d358c1d1ec5c6c33c773647ffaa" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_ingredients" ADD CONSTRAINT "FK_53ee83b6af2fad324bfcce6b0e2" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_ingredients" DROP CONSTRAINT "FK_53ee83b6af2fad324bfcce6b0e2"`);
        await queryRunner.query(`ALTER TABLE "products_ingredients" DROP CONSTRAINT "FK_d358c1d1ec5c6c33c773647ffaa"`);
        await queryRunner.query(`ALTER TABLE "booking_table" DROP CONSTRAINT "FK_b14ef4852452fbd8d38bca0052f"`);
        await queryRunner.query(`ALTER TABLE "booking_table" DROP CONSTRAINT "FK_1cd0f4b428f07ac0e23c67ea40b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_f9129a798f2308714d1e3be2463"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_a13ac3f2cebdd703ac557c5377c"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_bbaf66acc7e7c6dc3d1bc42a247"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_ac488fb5d877b66ec2e0dc7d7c5"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_d13308fb4357c972780ec7cf3b0"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53ee83b6af2fad324bfcce6b0e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d358c1d1ec5c6c33c773647ffa"`);
        await queryRunner.query(`DROP TABLE "products_ingredients"`);
        await queryRunner.query(`DROP TABLE "booking_table"`);
        await queryRunner.query(`DROP TYPE "public"."booking_table_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "menu_item"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "table"`);
        await queryRunner.query(`DROP TYPE "public"."table_status_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
