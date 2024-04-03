import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDomainVerification1710234455503 implements MigrationInterface {
  name = 'AddDomainVerification1710234455503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "domain" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_f89ae3e6726e17c0d6428a7ab3e" UNIQUE ("domain")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "domain_record" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "domain_pending_verifcation" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "domain_record_changed_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."credential_credential_type_enum" RENAME TO "credential_credential_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."credential_credential_type_enum" AS ENUM('EMAIL', 'WALLET', 'DOMAIN', 'MEMBER', 'DID_WEB')`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ALTER COLUMN "credential_type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ALTER COLUMN "credential_type" TYPE "public"."credential_credential_type_enum" USING "credential_type"::"text"::"public"."credential_credential_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ALTER COLUMN "credential_type" SET DEFAULT 'EMAIL'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."credential_credential_type_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."credential_credential_type_enum_old" AS ENUM('EMAIL', 'WALLET', 'DOMAIN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ALTER COLUMN "credential_type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ALTER COLUMN "credential_type" TYPE "public"."credential_credential_type_enum_old" USING "credential_type"::"text"::"public"."credential_credential_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ALTER COLUMN "credential_type" SET DEFAULT 'EMAIL'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."credential_credential_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."credential_credential_type_enum_old" RENAME TO "credential_credential_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "domain_record_changed_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_198ec8293e7494bcb870d581e42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "domain_pending_verifcation"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "domain_record"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_f89ae3e6726e17c0d6428a7ab3e"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "domain"`);
  }
}
