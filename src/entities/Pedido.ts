import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";

@Entity("pedidos")
class Pedido {

  @PrimaryColumn({ nullable: false })
  id: number;

  @JoinColumn({ name: "cliente_id" })
  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @Column()
  cliente_id: number;

  @Column()
  quantidade_total: number;

  @Column()
  valor_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Pedido }