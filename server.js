const http = require("http"); //módulo nativo do node
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Curso de Nodejs");
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
