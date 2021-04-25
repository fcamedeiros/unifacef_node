import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";

const routes = Router();

const clientesController = new ClientesController();

routes.post("/clientes", clientesController.create);

export { routes };