const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Comando /start para dar as boas-vindas
bot.start((ctx) => {
    ctx.reply('Bem-vindo ao Channel Feed Bot! Este bot alimenta um canal com conteúdo obtido de um feed RSS.');
});

// Webhook para receber os dados do Zapier e enviar para o canal
bot.on('/feed', async (ctx) => {
    const { message } = ctx.update;
    // Verifica se os dados recebidos são válidos (depende da estrutura do Webhook do Zapier)
    if (message) {
        const { text } = message;
        // Envie para o canal do Telegram
        try {
            await ctx.telegram.sendMessage('@seu_canal_aqui', text);
            ctx.reply('Mensagem enviada com sucesso para o canal.');
        } catch (error) {
            console.error('Erro ao enviar mensagem para o canal:', error);
            ctx.reply('Desculpe, ocorreu um erro ao enviar mensagem para o canal.');
        }
    } else {
        ctx.reply('Dados inválidos recebidos do Zapier.');
    }
});

bot.launch();
console.log('Channel Feed Bot está rodando...');
