import { livros } from "../models/Livro.js";

export class LivroController {
  static listarLivros = (req, res) => {
    //importo livros da minha entidade Livros.js. como é algo do mongoose, ele me trás os métodos para eu trabalhar com busca. o find é um deles.
    //para trazer os dados referentes ao id do author, eu utilizo o método populate, passando o campo que eu irei popular, e passo o exec para executar a função com os parâmetros de erro e de sucesso, tirando esses parâmetros do find, deixando o find vazio
    livros
      .find()
      .populate("author")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const { id } = req.params;

    livros
      .findById(id)
      .populate("author", "nome") //para que eu consiga especificar os campos que eu quero que venham de author, basta eu passar eles no segundo parâmetro
      .exec((err, livros) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - ID do livro não localizado.` });
        } else {
          res.status(200).send(livros);
        }
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

  static atualizarLivro = (req, res) => {
    const { id } = req.params;

    //findByIdAndUpdate é um método do mongoose que recebe dois parâmetros.
    //O primeiro é o id, e o segundo é o critério de atualização. set é a palavra reservada para fazer a atualização
    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro foi atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const { id } = req.params;

    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro removido com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}
