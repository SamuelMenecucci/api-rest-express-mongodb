import { autores } from "../models/Autor.js";

export class AutorController {
  static listarAutores(req, res) {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  }

  static listarAutoresPorId(req, res) {
    const { id } = req.params;

    autores.findById(id, (err, autores) => {
      if (err) {
        req
          .status(400)
          .send({ message: `${err.message} - ID do autor não localizado` });
      } else {
        res.status(200).send(autores);
      }
    });
  }

  static cadastrarAutor(req, res) {
    let autor = new autores(req.body);

    autor.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar autor` });
      } else {
        res.status(201).send(autor.toJSON());
      }
    });
  }

  static atualizarAutor(req, res) {
    const { id } = req.params;

    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Autor atualizado com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  }

  static excluirAutor(req, res) {
    const { id } = req.params;
    autores.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: "Autor removido com sucesso" });
      }
    });
  }
}
