import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNonceToUser1710075408778 implements MigrationInterface {
    name = 'AddNonceToUser1710075408778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nonce" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "nonce_changed_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nonce_changed_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nonce"`);
    }

}
