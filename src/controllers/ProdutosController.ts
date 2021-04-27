import { Request, Response } from "express";
import { ProdutosService } from "../services/ProdutosService";

class ProdutosController {

  async findAll(request: Request, response: Response) {

    const produtosService = new ProdutosService();

    const produtos = await produtosService.findAll();

    return response.json(produtos);

  }

  async findByDescricao(request: Request, response: Response) {

    const { descricao } = request.params;
    const produtosService = new ProdutosService();

    try {

      const produtos = await produtosService.findByDescricao(descricao);

      return response.json(produtos);

    } catch (error) {

      return response.status(404).json({
        message: error.message,
      });
    }
  }

  async findByID(request: Request, response: Response) {

    const { id } = request.params;
    const produtosService = new ProdutosService();

    try {

      const produtos = await produtosService.findByID(Number(id));

      return response.json(produtos);

    } catch (error) {

      return response.status(404).json({
        message: error.message,
      });
    }
  }

  async create(request: Request, response: Response) {

    const { id, descricao, valor, quantidade } = request.body;
    const produtosService = new ProdutosService();

    try {

      const produto = await produtosService.create({
        id,
        descricao,
        valor,
        quantidade
      });

      if (produto) {
        return response.status(201).json(produto);
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

  async update(request: Request, response: Response) {
    const { id, descricao, valor, quantidade } = request.body;
    const produtosService = new ProdutosService();

    try {

      const produto = await produtosService.update({
        id,
        descricao,
        valor,
        quantidade
      });

      if (produto) {
        return response.status(200).json(produto);
      } else {
        return response.status(404).json({
          message: "Algo deu errado"
        });
      }

    } catch (error) {

      return response.status(404).json({
        message: error.message,
      });
    }
  }
}

export { ProdutosController }