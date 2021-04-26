import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutos1619374461124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: "id",
                        type: "number",
                        isPrimary: true
                    },
                    {
                        name: "descricao",
                        type: "varchar"
                    },
                    {
                        name: "valor",
                        type: "decimal",
                        precision: 6,
                        scale: 2,
                        default: 0
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
        await queryRunner.dropTable("produtos");
    }

}
