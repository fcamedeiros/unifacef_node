import { Request, Response } from "express";
import { ClientesService } from "../services/ClientesService";

class ClientesController {

  async findAll(request: Request, response: Response) {

    const clientesService = new ClientesService();

    const clientes = await clientesService.findAll();

    return response.json(clientes);

  }

  async findByEmail(request: Request, response: Response) {

    const { email } = request.params;
    const clientesService = new ClientesService();

    try {

      const cliente = await clientesService.findByEmail(email);

      return response.json(cliente);

    } catch (error) {

      return response.status(404).json({
        message: error.message,
      });
    }
  }

  async findByID(request: Request, response: Response) {

    const { id } = request.params;
    const clientesService = new ClientesService();

    try {

      const cliente = await clientesService.findByID(Number(id));

      return response.json(cliente);

    } catch (error) {

      return response.status(404).json({
        message: error.message,
      });
    }
  }

  async create(request: Request, response: Response) {

    const { id, nome, sobrenome, email } = request.body;
    const clientesService = new ClientesService();

    try {

      const cliente = await clientesService.create({
        id,
        nome,
        sobrenome,
        email
      });

      return response.json(cliente);

    } catch (error) {

      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id, nome, sobrenome, email } = request.body;
    const clientesService = new ClientesService();

    try {

      const cliente = await clientesService.update({
        id,
        nome,
        sobrenome,
        email
      });

      return response.json(cliente);

    } catch (error) {

      return response.status(404).json({
        message: error.message,
      });
    }
  }
}

export { ClientesController }