import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedidos1619534992499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pedidos",
                columns: [
                    {
                        name: "id",
                        type: "number",
                        isPrimary: true
                    },
                    {
                        name: "cliente_id",
                        type: "number",
                    },
                    {
                        name: "quantidade_total",
                        type: "decimal",
                        precision: 6,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: "valor_total",
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
                ],
                foreignKeys: [
                    {
                        name: "FKCliente",
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"],
                        columnNames: ["cliente_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos");
    }

}