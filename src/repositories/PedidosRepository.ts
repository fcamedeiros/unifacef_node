import { EntityRepository, Repository } from "typeorm";
import { Pedido } from "../entities/Pedido";

@EntityRepository(Pedido)
class PedidosRepository extends Repository<Pedido> {

}

export { PedidosRepository }