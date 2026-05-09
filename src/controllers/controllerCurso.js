import {cursos} from "../models/modelcurso.js";
export const criarCurso = (req, res) => { 
    const cod = req.body.cod;
    const curso = req.body.nome;
    const ch = req.body.ch;
    const tipo = req.body.tipo;
    const cursoNovo = { cod, curso, ch, tipo };
    cursos.push(cursoNovo);
    res.status(200).json({ mensagem: "Curso cadastrado com sucesso!", cursoNovo }); // Envia uma resposta de sucesso

}

export function listarCursos(req, res) {
    res.status(200).json(cursos); // Envia a lista de cursos como resposta
}

 export const buscarCurso = (req, res) => {
    cont cursoEncontrado = cursos.find(c => c.cod === parseInt(req.params.cod));
    if (!cursoEncontrado) {
        return res.status(404).json({ mensagem: "Curso não encontrado!" });
    }
    res.status(200).json(cursoEncontrado); // Envia o curso encontrado como resposta
 };

 export function atualizarCurso(req, res) {
    const cursoEncontrado = cursos.find(c => c.cod === parseInt(req.params.cod));
    if (!cursoEncontrado) {
        return res.status(404).json({ mensagem: "Curso não encontrado!" });
    }
 
    const { nome,curso, ch, tipo } = req.body;

    if(!nome || !curso || !ch || !tipo) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }
    cursoEncontrado.nome = nome;
    cursoEncontrado.curso = curso;
    cursoEncontrado.ch = ch;
    cursoEncontrado.tipo = tipo;
    res.status(200).json({ mensagem: "Curso atualizado com sucesso!", cursoEncontrado });

 }
    export function removerCurso(req, res) {
        cons cursoEncontrado = cursos.find(c => c.cod === parseInt(req.params.cod));
        if (!cursoEncontrado) {
            return res.status(404).json({ mensagem: "Curso não encontrado!" });
        }
        const index = cursos.indexOf(cursoEncontrado);
        cursos.splice(index, 1);
        res.status(200).json({ mensagem: "Curso removido com sucesso!" });
    }

export function alterarCurso(req, res) {
    const cursoEncontrado = cursos.find(c => c.cod === parseInt(req.params.cod));
    if (!cursoEncontrado) {
        return res.status(404).json({ mensagem: "Curso não encontrado!" });
    }
    const { nome, curso, ch, tipo } = req.body;
    if (nome) cursoEncontrado.nome = nome;
    if (curso) cursoEncontrado.curso = curso;
    if (ch) cursoEncontrado.ch = ch;
    if (tipo) cursoEncontrado.tipo = tipo;
    res.status(200).json({ mensagem: "Curso alterado com sucesso!", cursoEncontrado });
}
