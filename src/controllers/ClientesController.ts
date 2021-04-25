import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClientesRepository } from "../repositories/ClientesRepository";

class ClientesController {

  async create(request: Request, response: Response) {

    const { email } = request.body;

    const clientesRepository = getCustomRepository(ClientesRepository);

    const cliente = clientesRepository.create({
      email
    });

    await clientesRepository.save(cliente);

    return response.json(cliente);
  }
}

export { ClientesController }