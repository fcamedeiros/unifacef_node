import { getCustomRepository, Repository } from "typeorm";
import { Produto } from "../entities/produto";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

interface IProdutosCreate {
  descricao: string;
  valor: number;
}

interface IProdutosUpdate {
  id: string;
  descricao: string;
  valor: number;
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

    if (!produtos) {
      throw new Error("Produto(s) not found");
    }

    return produtos;
  }

  async create({ descricao, valor }: IProdutosCreate) {

    const produtoAlreadyExists = await this.produtosRepository
      .createQueryBuilder()
      .where("LOWER(descricao) = LOWER(:descricao)", { descricao })
      .getOne();

    if (produtoAlreadyExists) {
      throw new Error("Produto already exists!");
    }

    const produto = this.produtosRepository.create({
      descricao,
      valor
    });

    await this.produtosRepository.save(produto);

    return produto;
  }

  async update({ id, descricao, valor }: IProdutosUpdate) {

    const produto = await this.produtosRepository.findOne({
      id
    });

    if (!produto) {
      throw new Error("ID Produto not found");
    }

    await this.produtosRepository.createQueryBuilder()
      .update("Produto")
      .set({ descricao, valor })
      .where("id = :id", {
        id
      }).execute();

    const produtoAlterado = await this.produtosRepository.findOne({
      id
    });

    return produtoAlterado;
  }
}

export { ProdutosService }