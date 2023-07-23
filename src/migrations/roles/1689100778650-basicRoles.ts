import { MigrationInterface, QueryRunner } from "typeorm"

export class BasicRoles1689100778650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO role (role, rank) VALUES ('ADMIN', 3);
            INSERT INTO role (role, rank) VALUES ('MODERATOR', 2);
            INSERT INTO role (role, rank) VALUES ('USER', 1);
            INSERT INTO role (role, rank) VALUES ('TEST', 1);
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
