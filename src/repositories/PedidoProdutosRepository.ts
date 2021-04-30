import { EntityRepository, Repository } from "typeorm";
import { PedidoProduto } from "../entities/PedidoProduto";

@EntityRepository(PedidoProduto)
class PedidoProdutosRepository extends Repository<PedidoProduto> {

}

export { PedidoProdutosRepository }