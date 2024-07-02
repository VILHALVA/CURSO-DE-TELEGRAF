const { Telegraf } = require('telegraf');

// Substitua 'YOUR_BOT_TOKEN' pelo token que você recebeu do BotFather
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Middleware para ecoar mensagens para o console
bot.on('text', (ctx) => {
    console.log(`Mensagem recebida: ${ctx.message.text}`);
});

// Iniciar o bot
bot.launch();

console.log('Ecobot Eco está rodando...');
