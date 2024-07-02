const { Telegraf } = require('telegraf');
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

// Comando /start para dar as boas-vindas e mostrar as opções
bot.start((ctx) => {
    ctx.reply('Bem-vindo ao bot CRUD! Use os comandos:\n' +
              '/listar - Listar todos os usuários\n' +
              '/adicionar [nome] - Adicionar um novo usuário\n' +
              '/atualizar [id] [novo_nome] - Atualizar um usuário existente\n' +
              '/excluir [id] - Excluir um usuário');
});

// Comando /listar para listar todos os usuários
bot.command('listar', async (ctx) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        connection.release();

        if (rows.length > 0) {
            let response = 'Usuários cadastrados:\n';
            rows.forEach((row) => {
                response += `${row.id}: ${row.name}\n`;
            });
            ctx.reply(response);
        } else {
            ctx.reply('Nenhum usuário encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar usuários do MySQL:', error);
        ctx.reply('Desculpe, ocorreu um erro ao buscar os usuários.');
    }
});

// Comando /adicionar para adicionar um novo usuário
bot.command('adicionar', async (ctx) => {
    const name = ctx.message.text.split(' ')[1];
    if (!name) {
        ctx.reply('Por favor, especifique um nome para adicionar.');
        return;
    }
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO users (name) VALUES (?)', [name]);
        connection.release();
        ctx.reply(`Usuário "${name}" adicionado com sucesso.`);
    } catch (error) {
        console.error('Erro ao adicionar usuário no MySQL:', error);
        ctx.reply('Desculpe, ocorreu um erro ao adicionar o usuário.');
    }
});

// Comando /atualizar para atualizar um usuário existente
bot.command('atualizar', async (ctx) => {
    const params = ctx.message.text.split(' ');
    const id = params[1];
    const newName = params.slice(2).join(' ');
    if (!id || !newName) {
        ctx.reply('Por favor, especifique o ID e o novo nome para atualizar.');
        return;
    }
    try {
        const connection = await pool.getConnection();
        await connection.query('UPDATE users SET name = ? WHERE id = ?', [newName, id]);
        connection.release();
        ctx.reply(`Usuário com ID ${id} atualizado para "${newName}" com sucesso.`);
    } catch (error) {
        console.error('Erro ao atualizar usuário no MySQL:', error);
        ctx.reply('Desculpe, ocorreu um erro ao atualizar o usuário.');
    }
});

// Comando /excluir para excluir um usuário
bot.command('excluir', async (ctx) => {
    const id = ctx.message.text.split(' ')[1];
    if (!id) {
        ctx.reply('Por favor, especifique o ID do usuário para excluir.');
        return;
    }
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM users WHERE id = ?', [id]);
        connection.release();
        ctx.reply(`Usuário com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.error('Erro ao excluir usuário no MySQL:', error);
        ctx.reply('Desculpe, ocorreu um erro ao excluir o usuário.');
    }
});

bot.launch();
console.log('Bot de Telegram com CRUD conectado ao MySQL está rodando...');
