import app from "./src/app.js";
const port = process.env.PORT || 3000; //configuração para identificar a porta por uma variável ambiente ou em uma porta padrão

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
