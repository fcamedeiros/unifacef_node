import { EntityRepository, Repository } from "typeorm";
import { Produto } from "../entities/produto";

@EntityRepository(Produto)
class ProdutosRepository extends Repository<Produto> {

}

export { ProdutosRepository }