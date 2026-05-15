import path from "path";
import { bdConexao } from "../index.js"; // Certifique-se de que o caminho para o seu index.js está correto

// 1. ROTA GET: Renderiza/Envia a página HTML de cadastro
export const cadastroCurso = (req, res) => {
    // Garanta que o nome do arquivo físico seja exatamente igual ao que está na pasta (cadastro.html ou cadastroCurso.html)
    res.sendFile(path.resolve('./src/public/html/cadastro.html'));
};

// 2. ROTA POST: Cria um novo curso no Banco de Dados
export const criarCurso = (req, res) => {
    const { curso, ch, tipo } = req.body;

    // Como o formulário HTML não envia um "cod" (código) e sua tabela exige esse campo,
    // geramos um número inteiro aleatório para o código do curso.
    const cod = Math.floor(Math.random() * 1000); 

    const sql = "INSERT INTO cursos (cod, curso, ch, tipo) VALUES (?, ?, ?, ?)";
    
    bdConexao.query(sql, [cod, curso, ch, tipo], (err, result) => {
        if (err) {
            console.error("Erro ao inserir no banco de dados:", err);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar curso no banco!' });
        }
        
        // Após cadastrar com sucesso, redireciona o usuário de volta para a página de cadastro
        // Assim, o script do HTML roda de novo e mostra o novo curso na tabela automaticamente.
        res.redirect('/cadastro');
    });
};

// 3. ROTA GET: Retorna TODOS os cursos em formato JSON para o HTML preencher a tabela
export const listarCursos = (req, res) => {
    const sql = "SELECT * FROM cursos";
    
    bdConexao.query(sql, (err, resultados) => {
        if (err) {
            console.error("Erro ao buscar cursos:", err);
            return res.status(500).json({ mensagem: 'Erro ao buscar cursos!' });
        }
        
        // Retorna o Array de cursos vindo do MySQL em formato JSON
        res.status(200).json(resultados);
    });
};

// 4. ROTA GET: Busca um curso específico pelo NOME (usado na barra de busca do HTML)
export const buscarCurso = (req, res) => {
    // Captura o parâmetro enviado na URL (ex: /curso/Enfermagem)
    const nomeCurso = req.params.curso;
    
    // Usamos o LIKE com % para que a busca encontre o curso mesmo se o usuário não digitar o nome exato
    const sql = 'SELECT * FROM cursos WHERE curso LIKE ?';
    
    bdConexao.query(sql, [`%${nomeCurso}%`], (err, resultados) => {
        if (err) {
            console.error("Erro ao buscar o curso:", err);
            return res.status(500).json({ mensagem: 'Erro ao buscar o curso!' });
        }
        
        if (resultados.length === 0) {
            return res.status(404).json({ mensagem: 'Curso não encontrado!' });
        }
        
        // Retorna os cursos encontrados para o fetch do HTML
        res.status(200).json(resultados);
    });
};

// 5. ROTA PUT: Atualiza todos os dados de um curso pelo código (cod)
export const atualizarCurso = (req, res) => {
    const codigoCurso = req.params.cod;
    const { curso, ch, tipo } = req.body;

    if (!curso || !ch || !tipo) {
        return res.status(400).json({ mensagem: 'Preencha todos os dados!' });
    }

    const sql = "UPDATE cursos SET curso = ?, ch = ?, tipo = ? WHERE cod = ?";

    bdConexao.query(sql, [curso, ch, tipo, codigoCurso], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao atualizar o curso!' });
        }
        res.status(200).json({ mensagem: 'Curso atualizado com sucesso!' });
    });
};

// 6. ROTA PATCH: Atualiza apenas os dados enviados parcialmente pelo código (cod)
export const alterarCurso = (req, res) => {
    const codigoCurso = req.params.cod;
    const { curso, ch, tipo } = req.body;

    // Cria dinamicamente os campos que serão atualizados
    let campos = [];
    let valores = [];

    if (curso) { campos.push("curso = ?"); valores.push(curso); }
    if (ch) { campos.push("ch = ?"); valores.push(Number(ch)); }
    if (tipo) { campos.push("tipo = ?"); valores.push(tipo); }

    if (campos.length === 0) {
        return res.status(400).json({ mensagem: "Nenhum dado enviado para alteração." });
    }

    valores.push(codigoCurso); // Adiciona o código no final para o WHERE
    const sql = `UPDATE cursos SET ${campos.join(", ")} WHERE cod = ?`;

    bdConexao.query(sql, valores, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao alterar o curso!' });
        }
        res.status(200).json({ mensagem: 'Curso alterado com sucesso!' });
    });
};

// 7. ROTA DELETE: Remove um curso pelo código (cod)
export const removerCurso = (req, res) => {
    const codigoCurso = req.params.cod;
    const sql = "DELETE FROM cursos WHERE cod = ?";

    bdConexao.query(sql, [codigoCurso], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao remover o curso!' });
        }
        res.status(200).json({ mensagem: 'Curso removido com sucesso!' });
    });
};