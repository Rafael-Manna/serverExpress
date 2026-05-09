import express from "express";
import path from "path";
import { criarCurso } from "../controllers/controllerCurso.js";
const routeCurso = express.Router();


// rota para acessar o formulário de cadastro

routeCurso.get("/cadastro", (req, res) => {
    res.sendFile(path.resolve("./public/html/cadastro.html"));
});


//rota para criar um curso
routeCurso.post("/curso", criarCurso);

//rota para atualizar todos os dados
routeCurso.put("/curso/:cod", atualizarCurso);
/*
routeCurso.put("/curso/:cod", (req, res) => {
    const cursoEncontrado = cursos.find(c => c.curso === parseInt(req.params.curso));
    if (!cursoEncontrado) {
        return res.status(404).json({ mensagem: "Curso não encontrado!" });
    }
    res.status(200).json({ mensagem: "Curso atualizado com sucesso!", cursoEncontrado }); // Envia uma resposta de sucesso
});
*/

routeCurso.delete("/curso/:cod", removerCurso);

routeCurso.patch("/curso/:cod", alterarCurso);

export default routeCurso;