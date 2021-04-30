import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

@Entity("pedidoprodutos")
class PedidoProduto {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column()
  pedido_id: number;

  @JoinColumn({ name: "produto_id" })
  @ManyToOne(() => Produto)
  produto: Produto;

  @Column()
  produto_id: number;

  @Column()
  quantidade: number;

  @Column()
  valor: number;

}

export { PedidoProduto }