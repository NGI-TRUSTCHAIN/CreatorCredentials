import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConnection1710970800329 implements MigrationInterface {
    name = 'AddConnection1710970800329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."connection_status_enum" AS ENUM('REQUESTED', 'ACCEPTED', 'REJECTED', 'REVOKED')`);
        await queryRunner.query(`CREATE TABLE "connection" ("id" SERIAL NOT NULL, "issuer_id" integer NOT NULL, "creator_id" integer NOT NULL, "status" "public"."connection_status_enum" NOT NULL DEFAULT 'REQUESTED', "issuerId" integer, "creatorId" integer, CONSTRAINT "PK_be611ce8b8cf439091c82a334b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_credentials_to_issue_enum" AS ENUM('EMAIL', 'WALLET', 'MEMBER', 'DOMAIN', 'DID_WEB')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "credentials_to_issue" "public"."user_credentials_to_issue_enum" array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_20c423618f849411ab08bafb535" FOREIGN KEY ("issuerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_755e298305f3cedebf513678c77" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_755e298305f3cedebf513678c77"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_20c423618f849411ab08bafb535"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "credentials_to_issue"`);
        await queryRunner.query(`DROP TYPE "public"."user_credentials_to_issue_enum"`);
        await queryRunner.query(`DROP TABLE "connection"`);
        await queryRunner.query(`DROP TYPE "public"."connection_status_enum"`);
    }

}
