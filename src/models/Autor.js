import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true },
    nacionalidade: { type: String, required: true },
  },
  {
    //versionkey versiona os modelos. caso não seja setado para false, quando for inserido algum dado no banco, ele irá com o atributo de versionamento, e sempre que houver uma mudança no schema, esse valor será alterado automaticamente
    versionKey: false,
  }
);

export const autores = mongoose.model("autores", autorSchema);
