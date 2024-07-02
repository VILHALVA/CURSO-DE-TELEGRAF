const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Comando /dados para obter dados de uma API externa
bot.command('dados', async (ctx) => {
    try {
        const response = await axios.get('https://api.example.com/dados');
        const dados = response.data;
        ctx.reply(`Dados da API externa: ${dados}`);
    } catch (error) {
        console.error('Erro ao obter dados da API externa:', error);
        ctx.reply('Desculpe, ocorreu um erro ao obter os dados da API externa.');
    }
});

// Comando /informacao para enviar uma informação interna fixa
bot.command('informacao', (ctx) => {
    const info = 'Esta é uma informação interna fixa.';
    ctx.reply(info);
});

bot.launch();
console.log('Bot API está rodando...');
