import express from "express";
import { AutorController } from "../controller/autores.controller.js";

export const autorRouter = express.Router();

autorRouter.get("/autores", AutorController.listarAutores);

autorRouter.get("/autores/:id", AutorController.listarAutoresPorId);

autorRouter.post("/autores", AutorController.cadastrarAutor);

autorRouter.put("/autores/:id", AutorController.atualizarAutor);

autorRouter.delete("/autores/:id", AutorController.excluirAutor);
