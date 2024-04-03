import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIssuerToCredentials1711042691413 implements MigrationInterface {
    name = 'AddIssuerToCredentials1711042691413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_755e298305f3cedebf513678c77"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_20c423618f849411ab08bafb535"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP COLUMN "issuerId"`);
        await queryRunner.query(`ALTER TABLE "credential" ADD "issuer_id" integer`);
        await queryRunner.query(`ALTER TABLE "credential" ADD "value" character varying`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_dd4f25f3ec37815a050d709d000" FOREIGN KEY ("issuer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_1f06d4a42daf6805a322496bff9" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credential" ADD CONSTRAINT "FK_fe8bdcf1ba70a7a987e5f2589e9" FOREIGN KEY ("issuer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" DROP CONSTRAINT "FK_fe8bdcf1ba70a7a987e5f2589e9"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_1f06d4a42daf6805a322496bff9"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_dd4f25f3ec37815a050d709d000"`);
        await queryRunner.query(`ALTER TABLE "credential" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "credential" DROP COLUMN "issuer_id"`);
        await queryRunner.query(`ALTER TABLE "connection" ADD "issuerId" integer`);
        await queryRunner.query(`ALTER TABLE "connection" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_20c423618f849411ab08bafb535" FOREIGN KEY ("issuerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_755e298305f3cedebf513678c77" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
