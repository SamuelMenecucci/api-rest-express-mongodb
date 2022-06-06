import express from "express";
import { db } from "./config/db.js";
import { livros } from "./models/Livro.js";

db.on("error", console.log.bind(console, "Erro de conexão")); //método que eu prevejo o que esta acontecendo, passo o error pois é o evento que quero pegar e tratar

db.once("open", () => console.log("conexão com o banco feita com sucesso")); //para tentar fazer algo uma vez. passo o open pois é o nome do evento que faz essa conexão

const app = express();

// let livros = [
//   {
//     id: 1,
//     titulo: "Senhor dos Anéis",
//   },
//   {
//     id: 2,
//     titulo: "O Hobbit",
//   },
// ];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node");
});

app.get("/livros", (req, res) => {
  //import livros da minha entidade Livros.js. como é algo do mongoose, ele me trás os métodos para eu trabalhar com busca. o find é um deles.
  livros.find((err, livros) => {
    res.status(200).json(livros);
  });
});

app.get("/livros/:id", (req, res, next) => {
  try {
    let { id } = req.params;

    const index = buscarLivro(+id);

    if (index === -1) throw new Error("Livro não encontrado");

    res.status(200).send(livros[index]);
  } catch (err) {
    next(err);
  }
});

app.post("/livros", (req, res) => {
  const livro = req.body;

  const lastId = livros[livros.length - 1].id;

  const novoLivro = { id: lastId + 1, titulo: livro.titulo };

  livros.push(novoLivro);

  res.status(200).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res, next) => {
  try {
    let { id } = req.params;
    id = +id;

    const index = buscarLivro(id);

    if (index === -1) throw new Error("Livro não encontrado");

    console.log(index);

    livros[index].titulo = req.body.titulo;

    console.log(livros);

    res.status(200).send("Dados atualizados");
  } catch (err) {
    next(err);
  }
});

app.delete("/livros/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    const index = buscarLivro(+id);

    if (index === -1) throw new Error("Livro não encontrado");

    livros.splice(index, 1);

    res.status(200).send(`Livro ${id} removido com sucesso`);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

function buscarLivro(id) {
  const found = livros.findIndex((element) => element.id === id);

  return found;
}

export default app;
