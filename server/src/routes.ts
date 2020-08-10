import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionController from "./controllers/ConnectionsController";
import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";

import { isAuthenticated } from "./middlewares/auth";

const routes = express.Router();

const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const sessionsController = new SessionsController();

/* Rotes de Criação e Listagem de 1 Usuário */
routes.get("/users", isAuthenticated, usersController.show);
routes.post("/users", usersController.create);
routes.put("/users", isAuthenticated, usersController.update);

/* Rotas de Criação e Listagem das Aulas */
routes.get("/classes", isAuthenticated, classesController.index);
routes.post("/classes", isAuthenticated, classesController.create);

/* Rotas de Criação e Listagem das Conexões */
routes.get("/connections", connectionsController.index);
routes.post("/connections", isAuthenticated, connectionsController.create);

/* Rotas de Login e Logout */
routes.post("/login", sessionsController.login);
routes.get("/logout", sessionsController.logout);

export default routes;
