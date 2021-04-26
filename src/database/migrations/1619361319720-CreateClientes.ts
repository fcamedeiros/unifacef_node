import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientes1619361319720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clientes",
                columns: [
                    {
                        name: "id",
                        type: "number",
                        isPrimary: true
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "sobrenome",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
