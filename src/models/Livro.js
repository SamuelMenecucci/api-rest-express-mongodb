//arquivo responsável por representar a entidade Livro

import mongoose from "mongoose";

//crio um schema para dize para o mongoose que é uma coleção e passo as atributos que estão no banco. definimos todos os atributos que possuímos no banco, e definimos se são obrigatórios ou não.
const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  author: { type: String, required: true },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number },
});

//corresponde a coleção inteira. Passo que no banco a coleção se chama livros, pois é o mesmo nome que coloquei no banco, e passo o schema dessa coleção, que são todos os atributos que a coleção possui e se são obrigatórios ou não.
//caso eu não tenha nenhuma coleção no banco criada, o primeiro parâmetro aqui se refere ao nome da coleção que irá ter no banco, e criará com o mesmo nome que passo aqui
export const livros = mongoose.model("livros", livroSchema);
