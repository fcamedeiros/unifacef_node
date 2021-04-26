import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("produtos")
class Produto {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ nullable: false })
  valor: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export { Produto }