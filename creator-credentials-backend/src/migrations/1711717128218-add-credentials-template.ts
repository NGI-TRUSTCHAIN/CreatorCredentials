import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCredentialsTemplate1711717128218 implements MigrationInterface {
  name = 'AddCredentialsTemplate1711717128218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."template_template_type_enum" AS ENUM('MEMBER', 'STUDENT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "template" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "template_type" "public"."template_template_type_enum" NOT NULL DEFAULT 'MEMBER', CONSTRAINT "UQ_84cfbda93ae632892710bffe401" UNIQUE ("template_type"), CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_templates" ("template_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_80970e37537ecec4a418d41a3ca" PRIMARY KEY ("template_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7adda11b1d6d21b75f67b04cf2" ON "users_templates" ("template_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9dd4980feb0086ab8a32eaaa10" ON "users_templates" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ADD "template_id" integer`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."credential_credential_type_enum" RENAME TO "credential_credential_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."credential_credential_type_enum" AS ENUM('EMAIL', 'WALLET', 'MEMBER', 'STUDENT', 'DOMAIN', 'DID_WEB')`,
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
    await queryRunner.query(
      `ALTER TYPE "public"."user_credentials_to_issue_enum" RENAME TO "user_credentials_to_issue_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_credentials_to_issue_enum" AS ENUM('EMAIL', 'WALLET', 'MEMBER', 'STUDENT', 'DOMAIN', 'DID_WEB')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "credentials_to_issue" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "credentials_to_issue" TYPE "public"."user_credentials_to_issue_enum"[] USING "credentials_to_issue"::"text"::"public"."user_credentials_to_issue_enum"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "credentials_to_issue" SET DEFAULT '{}'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_credentials_to_issue_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ADD CONSTRAINT "FK_94262abd8352fd19e4c500fff82" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_templates" ADD CONSTRAINT "FK_7adda11b1d6d21b75f67b04cf23" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_templates" ADD CONSTRAINT "FK_9dd4980feb0086ab8a32eaaa10b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_templates" DROP CONSTRAINT "FK_9dd4980feb0086ab8a32eaaa10b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_templates" DROP CONSTRAINT "FK_7adda11b1d6d21b75f67b04cf23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credential" DROP CONSTRAINT "FK_94262abd8352fd19e4c500fff82"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_credentials_to_issue_enum_old" AS ENUM('EMAIL', 'WALLET', 'MEMBER', 'DOMAIN', 'DID_WEB')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "credentials_to_issue" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "credentials_to_issue" TYPE "public"."user_credentials_to_issue_enum_old"[] USING "credentials_to_issue"::"text"::"public"."user_credentials_to_issue_enum_old"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "credentials_to_issue" SET DEFAULT '{}'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_credentials_to_issue_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_credentials_to_issue_enum_old" RENAME TO "user_credentials_to_issue_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."credential_credential_type_enum_old" AS ENUM('EMAIL', 'WALLET', 'DOMAIN', 'MEMBER', 'DID_WEB')`,
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
      `ALTER TABLE "credential" DROP COLUMN "template_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9dd4980feb0086ab8a32eaaa10"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7adda11b1d6d21b75f67b04cf2"`,
    );
    await queryRunner.query(`DROP TABLE "users_templates"`);
    await queryRunner.query(`DROP TABLE "template"`);
    await queryRunner.query(`DROP TYPE "public"."template_template_type_enum"`);
  }
}
