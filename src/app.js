import express from "express";
import { db } from "./config/db.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão")); //método que eu prevejo o que esta acontecendo, passo o error pois é o evento que quero pegar e tratar

db.once("open", () => console.log("conexão com o banco feita com sucesso")); //para tentar fazer algo uma vez. passo o open pois é o nome do evento que faz essa conexão

const app = express();

app.use(express.json());

routes(app);

export default app;
