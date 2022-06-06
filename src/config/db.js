import mongoose from "mongoose"; //lib do mongo para fazer a conexão com o banco.
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.APP_CONNECTION_STRING); //string de conexão que pego direto do database no site do mongo, aonde criei o meu projeto.

export let db = mongoose.connection;
