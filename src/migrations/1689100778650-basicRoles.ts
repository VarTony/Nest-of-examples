import { MigrationInterface, QueryRunner } from "typeorm"

export class BasicRoles1689100778650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (role, rank) 
            VALUES 
             ('ADMIN', 3),
             ('MODERATOR', 2),
             ('USER', 1),
             ('TEST', 1)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
