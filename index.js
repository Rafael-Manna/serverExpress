import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import routeCurso from './routes/routeCurso.js'; // Ajuste para './src/routes/routeCurso.js' se a pasta routes estiver dentro de src

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const server = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Configuração e exportação da conexão com o banco de dados MySQL
export const bdConexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Conectando ao Banco de Dados
bdConexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Middlewares para o Express entender JSON e formulários HTML (URLEncoded)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configuração de arquivos estáticos (CSS, Imagens, JS do Front-end)
// Ajuste o caminho se sua estrutura de pastas for diferente (ex: "src/public")
server.use(express.static(path.resolve("src", "public"))); 

// Vinculando todas as rotas estruturadas no seu arquivo routeCurso.js
server.use(routeCurso);

// Iniciando o servidor na porta configurada no .env
server.listen(PORT, HOST, () => {    
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});