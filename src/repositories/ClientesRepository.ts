import { EntityRepository, Repository } from "typeorm";
import { Cliente } from "../entities/cliente";

@EntityRepository(Cliente)
class ClientesRepository extends Repository<Cliente> {

}

export { ClientesRepository }