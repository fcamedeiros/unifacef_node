import { Request, Response } from "express";
import { PedidosService } from "../services/PedidosService";

class PedidosController {

  async create(request: Request, response: Response) {

    const { id, cliente_id, produtos } = request.body;
    const pedidosService = new PedidosService();

    try {

      const pedido = await pedidosService.create({
        id,
        cliente_id,
        produtos
      });

      if (pedido) {
        return response.status(201).json(pedido);
      } else {
        return response.status(404).json({
          message: "Algo deu errado"
        });
      }

    } catch (error) {

      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(request: Request, response: Response) {
    const pedidosService = new PedidosService();

    const listPedidos = await pedidosService.findAll();

    return response.json(listPedidos);
  }
}

export { PedidosController }