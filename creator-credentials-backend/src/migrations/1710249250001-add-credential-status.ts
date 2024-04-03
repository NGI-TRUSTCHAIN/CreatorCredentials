import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCredentialStatus1710249250001 implements MigrationInterface {
    name = 'AddCredentialStatus1710249250001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."credential_credential_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED')`);
        await queryRunner.query(`ALTER TABLE "credential" ADD "credential_status" "public"."credential_credential_status_enum" NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" DROP COLUMN "credential_status"`);
        await queryRunner.query(`DROP TYPE "public"."credential_credential_status_enum"`);
    }

}
