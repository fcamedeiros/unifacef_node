import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { Pedido } from "../entities/Pedido";
import { PedidoProduto } from "../entities/PedidoProduto";
import { Produto } from "../entities/Produto";
import { ClientesRepository } from "../repositories/ClientesRepository";
import { PedidoProdutosRepository } from "../repositories/PedidoProdutosRepository";
import { PedidosRepository } from "../repositories/PedidosRepository";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

interface IPedidos {
  id: number;
  cliente_id: number;
  produtos: Array<Produto>;
}

class PedidosService {

  private pedidosRepository: Repository<Pedido>;
  private clientesRepository: Repository<Cliente>;
  private produtosRepository: Repository<Produto>;
  private pedidoProdutosRepository: Repository<PedidoProduto>;

  constructor() {
    this.pedidosRepository = getCustomRepository(PedidosRepository);
    this.pedidoProdutosRepository = getCustomRepository(PedidoProdutosRepository);
    this.clientesRepository = getCustomRepository(ClientesRepository);
    this.produtosRepository = getCustomRepository(ProdutosRepository);
  }

  async create({ id, cliente_id, produtos }: IPedidos) {

    const pedidoAlreadyExists = await this.pedidosRepository.findOne({
      id
    });

    if (pedidoAlreadyExists) {
      throw new Error("Pedido " + id + " já cadastrado");
    }

    const clienteExists = await this.clientesRepository.createQueryBuilder()
      .where("id = :cliente_id", {
        cliente_id
      })
      .getOne();

    if (!clienteExists) {
      throw new Error("Cliente " + cliente_id + " não encontrado");
    }

    if (!produtos) {
      throw new Error("Produto(s) não informado(s)");
    }

    produtos.map((produto: Produto) => {
      if (!produto.quantidade) {
        throw new Error("Produto " + produto.id + " sem quantidade informada");
      }
    });

    const produtosCatalogo = await this.produtosRepository.find();

    let index = -1;
    let valor_total: number = 0.00;
    let quantidade_total: number = 0;
    let produtoCatalogo: Produto;
    let produtosUpdate = new Array<Produto>();
    let pedidoProdutoSave = new Array<PedidoProduto>();
    produtos.map((produto: Produto) => {

      let pedidoProduto = new PedidoProduto();

      index = produtosCatalogo.map((e) => { return e.id; }).indexOf(produto.id);

      produtoCatalogo = produtosCatalogo[index];

      if (!produtoCatalogo) {
        throw new Error("Produto " + produto.id + " não existe no catálogo");
      }

      if (produtoCatalogo.quantidade < produto.quantidade) {
        throw new Error("Produto " + produto.id
          + " possui quantidade insuficiente ("
          + produtoCatalogo.quantidade + ")");
      }

      produtoCatalogo.quantidade = produtoCatalogo.quantidade - produto.quantidade;
      produtosUpdate.push(produtoCatalogo);

      pedidoProduto.id = Number(String(id) + String(produto.id));
      pedidoProduto.pedido_id = Number(id);
      pedidoProduto.produto_id = produto.id;
      pedidoProduto.quantidade = produto.quantidade;
      pedidoProduto.valor = produtoCatalogo.valor;
      pedidoProdutoSave.push(pedidoProduto);

      quantidade_total += produto.quantidade;
      valor_total += (produtoCatalogo.valor * produto.quantidade);

      valor_total = (Math.floor(valor_total * Math.pow(10, 2)) / Math.pow(10, 2));
    });

    const pedido = this.pedidosRepository.create({
      id,
      cliente_id,
      quantidade_total,
      valor_total
    });

    await this.pedidosRepository.save(pedido);

    produtosUpdate.map(async (produto: Produto) => {
      await this.produtosRepository.save(produto);
    });

    pedidoProdutoSave.map(async (pedidoProduto: PedidoProduto) => {
      await this.pedidoProdutosRepository.save(pedidoProduto);
    });

    return pedido;
  }

  async findAll() {

    const listPedidos = await this.pedidosRepository.find({
      relations: ["cliente"],
    });

    return listPedidos;
  }
}

export { PedidosService }