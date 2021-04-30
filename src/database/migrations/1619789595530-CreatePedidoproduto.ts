import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedidoprodutos1619789595530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pedidoprodutos",
                columns: [
                    {
                        name: "id",
                        type: "number",
                        isPrimary: true
                    },
                    {
                        name: "pedido_id",
                        type: "number",
                    },
                    {
                        name: "produto_id",
                        type: "number",
                    },
                    {
                        name: "quantidade",
                        type: "decimal",
                        precision: 6,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: "valor",
                        type: "decimal",
                        precision: 6,
                        scale: 2,
                        default: 0
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKPedido",
                        referencedTableName: "pedidos",
                        referencedColumnNames: ["id"],
                        columnNames: ["pedido_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKProduto",
                        referencedTableName: "produtos",
                        referencedColumnNames: ["id"],
                        columnNames: ["produto_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidoprodutos");
    }
}
