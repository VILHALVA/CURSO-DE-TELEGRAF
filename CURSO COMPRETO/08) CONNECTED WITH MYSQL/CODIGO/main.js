const { Telegraf, Markup } = require('telegraf');
const mysql = require('mysql2/promise');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Conexão com o MySQL usando pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware para armazenar mensagens no MySQL
bot.use(async (ctx, next) => {
    const { message } = ctx.update;
    if (message) {
        const { text, chat, from } = message;
        const userId = from.id;

        try {
            const connection = await pool.getConnection();
            await connection.query(
                'INSERT INTO messages (user_id, message_text) VALUES (?, ?)',
                [userId, text]
            );
            connection.release();
        } catch (error) {
            console.error('Erro ao inserir mensagem no MySQL:', error);
        }
    }
    next();
});

// Comando /start para dar as boas-vindas e mostrar as opções
bot.start((ctx) => {
    ctx.reply('Bem-vindo! Use os comandos ou digite algo para armazenar no banco de dados.');
});

// Comando /mensagens para listar as mensagens armazenadas
bot.command('mensagens', async (ctx) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT * FROM messages ORDER BY created_at DESC LIMIT 5'
        );
        connection.release();

        if (rows.length > 0) {
            let response = 'Últimas mensagens armazenadas:\n';
            rows.forEach((row) => {
                response += `Usuário ID: ${row.user_id}\nMensagem: ${row.message_text}\n\n`;
            });
            ctx.reply(response);
        } else {
            ctx.reply('Nenhuma mensagem encontrada.');
        }
    } catch (error) {
        console.error('Erro ao buscar mensagens do MySQL:', error);
        ctx.reply('Desculpe, ocorreu um erro ao buscar as mensagens.');
    }
});

// Comando para manipular consultas inline (neste exemplo não será implementado)

bot.launch();
console.log('Bot de Telegram conectado ao MySQL está rodando...');
