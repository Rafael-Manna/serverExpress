import express from "express";
import path from "path";

const server = express();
const PORT = 3000;
const HOST = "localhost";


app.use(express.json());// middleware
app.use(express.urlencoded({ extended: true })); // middleware para processar dados de formulários


server.get("/", (req, res) => {
  res.send(`
    <h1>Olá, mundo!</h1>
    <p style="color: blue;">Este é um servidor Express rodando em Node.js.</p>
    
    `);
});

server.get("/cadastro", (req, res) => {
    res.sendFile(path.resolve("cadastro.html"));
});

server.listen(PORT, HOST, () => {    
 console.log(`Servidor rodando em http://${HOST}:${PORT}`);
 console.log("teste.");
});