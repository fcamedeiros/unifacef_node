import { Request, Response } from "express";
import { PedidoProdutosService } from "../services/PedidoProdutosService";

class PedidoProdutosController {

  async findProdutosPedido(request: Request, response: Response) {
    const { pedido_id } = request.params;

    const produtoPedidosService = new PedidoProdutosService();

    const listProdutos = await produtoPedidosService
      .listProdutosPedido(Number(pedido_id));

    return response.json(listProdutos);
  }
}

export { PedidoProdutosController }