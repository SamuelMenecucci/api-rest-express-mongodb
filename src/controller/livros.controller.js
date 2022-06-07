import { livros } from "../models/Livro.js";

export class LivroController {
  static listarLivros = (req, res) => {
    //import livros da minha entidade Livros.js. como é algo do mongoose, ele me trás os métodos para eu trabalhar com busca. o find é um deles.
    livros.find((err, livros) => {
      res.status(200).json(livros);
    });
  };
}
