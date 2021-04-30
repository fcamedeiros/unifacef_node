import { getCustomRepository, Repository } from "typeorm";
import { PedidoProduto } from "../entities/PedidoProduto";
import { PedidoProdutosRepository } from "../repositories/PedidoProdutosRepository";


class PedidoProdutosService {


  private pedidoProdutosRepository: Repository<PedidoProduto>;

  constructor() {
    this.pedidoProdutosRepository = getCustomRepository(PedidoProdutosRepository);
  }

  async listProdutosPedido(pedido_id: number) {

    const listProdutos = this.pedidoProdutosRepository.find({
      where: { pedido_id },
      relations: ["produto"]
    });

    return listProdutos;

  }
}

export { PedidoProdutosService }