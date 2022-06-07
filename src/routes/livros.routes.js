import express from "express";
import { LivroController } from "../controller/livros.controller.js";

export const livroRouter = express.Router();

livroRouter.get("/livros", LivroController.listarLivros);

livroRouter.get("/livros/:id", LivroController.listarLivroPorId);

livroRouter.post("/livros", LivroController.cadastrarLivro);

livroRouter.put("/livros/:id", LivroController.atualizarLivro);

livroRouter.delete("/livros/:id", LivroController.excluirLivro);
