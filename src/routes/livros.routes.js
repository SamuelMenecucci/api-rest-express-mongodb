import express from "express";
import { LivroController } from "../controller/livros.controller.js";

export const livroRouter = express.Router();

livroRouter.get("/livros", LivroController.listarLivros);

livroRouter.post("/livros", LivroController.cadastrarLivro);
