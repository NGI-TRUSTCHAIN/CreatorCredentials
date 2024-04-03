import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserProperties1711301554336 implements MigrationInterface {
    name = 'AddUserProperties1711301554336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying NOT NULL DEFAULT 'This is default creator credentials description.'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL DEFAULT 'Default name'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "image_url" character varying NOT NULL DEFAULT '/images/brand.svg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
