import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";
import { PedidoProdutosController } from "./controllers/PedidoProdutosController";
import { PedidosController } from "./controllers/PedidosController";
import { ProdutosController } from "./controllers/ProdutosController";

const routes = Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();
const pedidosController = new PedidosController();
const pedidoProdutosController = new PedidoProdutosController();

routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/email/:email", clientesController.findByEmail);
routes.get("/clientes/id/:id", clientesController.findByID);
routes.post("/clientes", clientesController.create);
routes.put("/clientes", clientesController.update);
routes.get("/clientes/pedidos/:cliente_id", clientesController.showPedidosCliente);

routes.get("/produtos", produtosController.findAll);
routes.get("/produtos/descricao/:descricao", produtosController.findByDescricao);
routes.get("/produtos/id/:id", produtosController.findByID);
routes.post("/produtos", produtosController.create);
routes.put("/produtos", produtosController.update);

routes.post("/pedidos", pedidosController.create);
routes.get("/pedidos", pedidosController.findAll);
routes.get("/pedidos/produtos/:pedido_id", pedidoProdutosController.findProdutosPedido);

export { routes };