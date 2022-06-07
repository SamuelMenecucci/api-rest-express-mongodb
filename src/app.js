import express from "express";
import { db } from "./config/db.js";
import { livros } from "./models/Livro.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão")); //método que eu prevejo o que esta acontecendo, passo o error pois é o evento que quero pegar e tratar

db.once("open", () => console.log("conexão com o banco feita com sucesso")); //para tentar fazer algo uma vez. passo o open pois é o nome do evento que faz essa conexão

const app = express();

app.use(express.json());

routes(app);

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
