import { livros } from "../models/Livro.js";

export class LivroController {
  static listarLivros = (req, res) => {
    //import livros da minha entidade Livros.js. como é algo do mongoose, ele me trás os métodos para eu trabalhar com busca. o find é um deles.
    livros.find((err, livros) => {
      res.status(200).json(livros);
    });
  };

  static cadastrarLivro = (req, res) => {
    //crio uma nova instância de livros, para dizer todos os atributos que o livro irá possuir
    let livro = new livros(req.body);

    //.save é do mongoose. passo o erro para trata-lo caso exista e caso não, passo o que será feito
    livro.save((err) => {
      if (err) {
        res
          .status(500) //código 500 é de erro interno no servidor
          .send({ message: `${err.message} - falha ao cadastrar livro` });
      } else {
        //como retorno, irá trazer um campo __v, que corresponde ao versionamento do modelo do livro, caso haja alguma alteração, esse versionamento irá mudar automaticamente.
        //código 201 é de um recurso criado.
        res.status(201).send(livro.toJSON());
      }
    });
  };
}
