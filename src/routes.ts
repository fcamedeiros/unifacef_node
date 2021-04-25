import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";
import { ProdutosController } from "./controllers/ProdutosController";

const routes = Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();

routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/:email", clientesController.findByEmail);
routes.post("/clientes", clientesController.create);
routes.put("/clientes", clientesController.update);

routes.get("/produtos", produtosController.findAll);
routes.get("/produtos/:descricao", produtosController.findByDescricao);
routes.post("/produtos", produtosController.create);
routes.put("/produtos", produtosController.update);

export { routes };