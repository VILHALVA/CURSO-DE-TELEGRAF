const { Telegraf } = require('telegraf');

// Substitua 'YOUR_BOT_TOKEN' pelo token que você recebeu do BotFather
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Comando /start
bot.start((ctx) => {
    ctx.reply('Olá! Eu sou o Ecobot 🌱. Como posso te ajudar hoje?');
});

// Comando /help
bot.help((ctx) => {
    ctx.reply('O Ecobot está aqui para fornecer informações sobre meio ambiente e sustentabilidade. Experimente perguntar sobre questões ambientais ou sustentáveis!');
});

// Comando personalizado /informacao
bot.command('informacao', (ctx) => {
    ctx.reply('Aqui estão algumas informações sobre sustentabilidade: ... (insira informações relevantes sobre sustentabilidade aqui)');
});

// Responder a mensagens contendo palavras-chave
bot.hears('reciclagem', (ctx) => {
    ctx.reply('Reciclar é fundamental para reduzir o impacto ambiental! ♻️');
});

bot.hears('energia renovável', (ctx) => {
    ctx.reply('Energia renovável é uma ótima alternativa para reduzir emissões de carbono! ☀️💨');
});

// Tratamento de outros tipos de mensagens
bot.on('message', (ctx) => {
    ctx.reply('Desculpe, não entendi. Use comandos ou palavras-chave relacionadas ao meio ambiente e sustentabilidade.');
});

// Iniciar o bot
bot.launch();

console.log('Ecobot está rodando...');
