import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCredential1705535489992 implements MigrationInterface {
    name = 'CreateCredential1705535489992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."credential_credential_type_enum" AS ENUM('EMAIL')`);
        await queryRunner.query(`CREATE TABLE "credential" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "credential_type" "public"."credential_credential_type_enum" NOT NULL DEFAULT 'EMAIL', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_3a5169bcd3d5463cefeec78be82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credential" ADD CONSTRAINT "FK_f462968b424cfa19b629109b6f3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" DROP CONSTRAINT "FK_f462968b424cfa19b629109b6f3"`);
        await queryRunner.query(`DROP TABLE "credential"`);
        await queryRunner.query(`DROP TYPE "public"."credential_credential_type_enum"`);
    }

}
