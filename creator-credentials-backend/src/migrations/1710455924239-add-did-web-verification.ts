import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDidWebVerification1710455924239 implements MigrationInterface {
    name = 'AddDidWebVerification1710455924239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "did_web" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_803abc16225e13314e4d8561395" UNIQUE ("did_web")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "did_web_well_known" jsonb`);
        await queryRunner.query(`ALTER TABLE "user" ADD "did_web_pending_verifcation" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "did_web_well_known_changed_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "did_web_well_known_changed_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "did_web_pending_verifcation"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "did_web_well_known"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_803abc16225e13314e4d8561395"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "did_web"`);
    }

}
