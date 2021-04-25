import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/cliente";
import { ClientesRepository } from "../repositories/ClientesRepository";

interface IClientesCreate {
  email: string;
}

interface IClientesUpdate {
  id: string;
  email: string;
}

class ClientesService {

  private clientesRepository: Repository<Cliente>;

  constructor() {
    this.clientesRepository = getCustomRepository(ClientesRepository);
  }

  async findByEmail(email: string) {
    const cliente = await this.clientesRepository.findOne({
      email
    });

    if (!cliente) {
      throw new Error("Cliente not found");
    }

    return cliente;
  }

  async findAll() {
    const clientes = await this.clientesRepository.find();

    return clientes;
  }

  async create({ email }: IClientesCreate) {

    const clienteAlreadyExists = await this.clientesRepository.findOne({
      email
    });

    if (clienteAlreadyExists) {
      throw new Error("Cliente already exists!");
    }

    const cliente = this.clientesRepository.create({
      email
    });

    await this.clientesRepository.save(cliente);

    return cliente;
  }

  async update({ id, email }: IClientesUpdate) {

    const cliente = await this.clientesRepository.findOne({
      id
    });

    if (!cliente) {
      throw new Error("ID Cliente not found");
    }

    await this.clientesRepository.createQueryBuilder()
      .update("Cliente")
      .set({ email })
      .where("id = :id", {
        id
      }).execute();

    const clienteAlterado = await this.clientesRepository.findOne({
      id
    });

    return clienteAlterado;
  }
}

export { ClientesService }