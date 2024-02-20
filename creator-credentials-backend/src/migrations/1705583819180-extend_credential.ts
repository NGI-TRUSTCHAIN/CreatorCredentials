import { MigrationInterface, QueryRunner } from "typeorm";

export class ExtendCredential1705583819180 implements MigrationInterface {
    name = 'ExtendCredential1705583819180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "credential" ADD "credentialObject" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" DROP COLUMN "credentialObject"`);
        await queryRunner.query(`ALTER TABLE "credential" DROP COLUMN "token"`);
    }

}
