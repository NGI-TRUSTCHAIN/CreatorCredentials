import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPublicAddressToUser1710084497529 implements MigrationInterface {
    name = 'AddPublicAddressToUser1710084497529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "public_address" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_dff45ec969dd72075b6c04707fd" UNIQUE ("public_address")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_dff45ec969dd72075b6c04707fd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "public_address"`);
    }

}
