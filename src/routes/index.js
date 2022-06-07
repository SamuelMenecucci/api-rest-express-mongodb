import express from "express";
import { autorRouter } from "./autores.routes.js";
import { livroRouter } from "./livros.routes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de Node" });
  });

  app.use(express.json(), livroRouter, autorRouter);
};

export default routes;
