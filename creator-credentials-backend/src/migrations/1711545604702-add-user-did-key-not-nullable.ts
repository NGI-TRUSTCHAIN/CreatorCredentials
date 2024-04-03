import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDidKeyNotNullable1711545604702
  implements MigrationInterface
{
  name = 'AddUserDidKeyNotNullable1711545604702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "did_key" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "did_key" DROP NOT NULL`,
    );
  }
}
