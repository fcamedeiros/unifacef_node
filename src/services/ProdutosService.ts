import { getCustomRepository, Repository } from "typeorm";
import { Produto } from "../entities/Produto";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

interface IProdutos {
  id: number;
  descricao: string;
  valor: number;
  quantidade: number;
}

class ProdutosService {

  private produtosRepository: Repository<Produto>;

  constructor() {
    this.produtosRepository = getCustomRepository(ProdutosRepository);
  }

  async findAll() {
    const produtos = await this.produtosRepository.find();

    return produtos;
  }

  async findByDescricao(descricao: string) {
    const produtos = await this.produtosRepository
      .createQueryBuilder()
      .where("LOWER(descricao) LIKE LOWER(:descricao)", { descricao: "%" + descricao + "%" })
      .getMany();

    if (produtos.length === 0) {
      throw new Error("Produto(s) não encontrado(s)");
    }

    return produtos;
  }

  async findByID(id: number) {
    const produtos = await this.produtosRepository.findOne({
      id
    });

    if (!produtos) {
      throw new Error("Produto não encontrado");
    }

    return produtos;
  }

  async create({ id, descricao, valor, quantidade }: IProdutos) {

    let produtoAlreadyExists = await this.produtosRepository
      .createQueryBuilder()
      .where("LOWER(descricao) = LOWER(:descricao)", { descricao })
      .getOne();

    if (produtoAlreadyExists) {
      throw new Error("Produto já cadastrado");
    }

    produtoAlreadyExists = await this.produtosRepository.findOne({
      id
    });

    if (produtoAlreadyExists) {
      throw new Error("Código Produto já utilizado");
    }

    const produto = this.produtosRepository.create({
      id,
      descricao,
      valor,
      quantidade
    });

    await this.produtosRepository.save(produto);

    return produto;
  }

  async update({ id, descricao, valor, quantidade }: IProdutos) {

    const produto = await this.produtosRepository.findOne({
      id
    });

    if (!produto) {
      throw new Error("ID Produto não encontrado");
    }

    produto.descricao = descricao;
    produto.valor = valor;
    produto.quantidade = quantidade;

    await this.produtosRepository.save(produto);

    const produtoAlterado = await this.produtosRepository.findOne({
      id
    });

    return produtoAlterado;
  }
}

export { ProdutosService }