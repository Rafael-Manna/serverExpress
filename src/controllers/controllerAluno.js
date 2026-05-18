import path from "path";
import { bdConexao } from "../../index.js"; // Certifique-se de que o caminho para o seu index.js está correto

// 1. ROTA GET: Renderiza/Envia a página HTML de cadastro
export const cadastroAluno = (req, res) => {
    // Garanta que o nome do arquivo físico seja exatamente igual ao que está na pasta (cadastro.html ou cadastroCurso.html)
    res.sendFile(path.resolve('./src/public/html/cadastro.html'));
};

// 2. ROTA POST: Cria um novo curso no Banco de Dados
export const criarAluno = (req, res) => {
    const { matricula, nome, email, telefone, idCurso_aluno } = req.body;

    // Como o formulário HTML não envia um "cod" (código) e sua tabela exige esse campo,
    // geramos um número inteiro aleatório para o código do curso.
    

    const sql = "INSERT INTO alunos (matricula, nome, email, telefone, idCurso_aluno) VALUES (?, ?, ?, ?, ?)";
    
    bdConexao.query(sql, [matricula, nome, email, telefone, idCurso_aluno], (err, result) => {
        if (err) {
            console.error("Erro ao inserir no banco de dados:", err);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar curso no banco!' });
        }
        
        // Após cadastrar com sucesso, redireciona o usuário de volta para a página de cadastro
        // Assim, o script do HTML roda de novo e mostra o novo curso na tabela automaticamente.
        res.redirect('/alunos');
    });
};