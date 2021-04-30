import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("clientes")
class Cliente {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  sobrenome: string;

  @Column({ nullable: false })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export { Cliente }