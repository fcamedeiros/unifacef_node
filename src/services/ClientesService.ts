import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { Pedido } from "../entities/Pedido";
import { ClientesRepository } from "../repositories/ClientesRepository";
import { PedidosRepository } from "../repositories/PedidosRepository";

interface IClientes {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
}

class ClientesService {

  private clientesRepository: Repository<Cliente>;
  private pedidosRepository: Repository<Pedido>;

  constructor() {
    this.clientesRepository = getCustomRepository(ClientesRepository);
    this.pedidosRepository = getCustomRepository(PedidosRepository);
  }

  async findByEmail(email: string) {
    const cliente = await this.clientesRepository.findOne({
      email
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }

  async findByID(id: number) {
    const cliente = await this.clientesRepository.findOne({
      id
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }

  async findAll() {
    const clientes = await this.clientesRepository.find();

    return clientes;
  }

  async create({ id, nome, sobrenome, email }: IClientes) {

    let clienteAlreadyExists = await this.clientesRepository.findOne({
      email
    });

    if (clienteAlreadyExists) {
      throw new Error("E-mail já utilizado");
    }

    clienteAlreadyExists = await this.clientesRepository.findOne({
      id
    });

    if (clienteAlreadyExists) {
      throw new Error("ID Cliente já utilizado");
    }

    const cliente = this.clientesRepository.create({
      id,
      nome,
      sobrenome,
      email
    });

    await this.clientesRepository.save(cliente);

    return cliente;
  }

  async update({ id, nome, sobrenome, email }: IClientes) {

    const cliente = await this.clientesRepository.findOne({
      id
    });

    if (!cliente) {
      throw new Error("ID Cliente não encontrado");
    }

    cliente.nome = nome;
    cliente.sobrenome = sobrenome;
    cliente.email = email;

    await this.clientesRepository.save(cliente);

    const clienteAlterado = await this.clientesRepository.findOne({
      id
    });

    return clienteAlterado;
  }

  async listPedidosCliente(cliente_id: number) {

    const listPedidos = await this.pedidosRepository.createQueryBuilder()
      .where("cliente_id = :cliente_id", {
        cliente_id
      })
      .getMany();

    return listPedidos;
  }
}

export { ClientesService }