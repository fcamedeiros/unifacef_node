import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";

const routes = Router();

const clientesController = new ClientesController();

routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/:email", clientesController.findByEmail);
routes.post("/clientes", clientesController.create);
routes.put("/clientes", clientesController.update);

export { routes };