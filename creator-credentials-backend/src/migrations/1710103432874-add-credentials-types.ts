import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCredentialsTypes1710103432874 implements MigrationInterface {
    name = 'AddCredentialsTypes1710103432874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."credential_credential_type_enum" RENAME TO "credential_credential_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."credential_credential_type_enum" AS ENUM('EMAIL', 'WALLET', 'DOMAIN')`);
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "credential_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "credential_type" TYPE "public"."credential_credential_type_enum" USING "credential_type"::"text"::"public"."credential_credential_type_enum"`);
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "credential_type" SET DEFAULT 'EMAIL'`);
        await queryRunner.query(`DROP TYPE "public"."credential_credential_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."credential_credential_type_enum_old" AS ENUM('EMAIL')`);
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "credential_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "credential_type" TYPE "public"."credential_credential_type_enum_old" USING "credential_type"::"text"::"public"."credential_credential_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "credential_type" SET DEFAULT 'EMAIL'`);
        await queryRunner.query(`DROP TYPE "public"."credential_credential_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."credential_credential_type_enum_old" RENAME TO "credential_credential_type_enum"`);
    }

}
