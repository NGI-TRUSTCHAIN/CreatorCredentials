import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserDidKey1711545585723 implements MigrationInterface {
    name = 'AddUserDidKey1711545585723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "did_key" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_ed236b495db628e09b0a549aa72" UNIQUE ("did_key")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_ed236b495db628e09b0a549aa72"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "did_key"`);
    }

}
