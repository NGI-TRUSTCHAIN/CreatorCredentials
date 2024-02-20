import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1705278595653 implements MigrationInterface {
    name = 'CreateUser1705278595653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_clerk_role_enum" AS ENUM('issuer', 'creator')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "clerk_id" character varying NOT NULL, "clerk_role" "public"."user_clerk_role_enum" NOT NULL DEFAULT 'creator', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_92e2a470b415010a4dda4996281" UNIQUE ("clerk_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_clerk_role_enum"`);
    }

}
