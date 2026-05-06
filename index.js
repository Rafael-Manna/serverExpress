import express from "express";
import path from "path";

const server = express();
const PORT = 3000;
const HOST = "localhost";
.
let cursos = [{ curso: "Desenvolvimento Web", ch: 80, tipo: "EAD" }]; // Array para armazenar os cursos cadastrados

server.use(express.json());// middleware
server.use(express.urlencoded({ extended: true })); // middleware para processar dados de formulários

server.get("/", (req, res) => {
  res.send(`
    <h1>Olá, mundo!</h1>
    <p style="color: blue;">Este é um servidor Express rodando em Node.js.</p>
    
    `);
});

server.get("/cadastro", (req, res) => {
    res.sendFile(path.resolve("cadastro.html"));
});

server.post("/curso", (req, res) => {
    const curso = req.body.curso;
    const ch = req.body.ch;
    const tipo = req.body.tipo;
    cursos.push({ curso, ch, tipo }); // Adiciona o novo curso ao array de cursos
    res.status(200).json({ mensagem: "Curso cadastrado com sucesso!", curso, ch, tipo }); // Envia uma resposta de sucesso
});

server.listen(PORT, HOST, () => {    
 console.log(`Servidor rodando em http://${HOST}:${PORT}`);
 console.log("teste.");
});