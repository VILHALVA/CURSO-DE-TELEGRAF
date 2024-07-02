const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Comando /start para dar as boas-vindas e mostrar as opções
bot.start((ctx) => {
    ctx.reply(`Bem-vindo ao Crypto Bot! Use os comandos ou digite '@CryptoBot nome_da_moeda' para ver informações sobre uma criptomoeda.`);
    ctx.reply('Escolha uma opção:', Markup
        .keyboard([
            ['Bitcoin', 'Ethereum'],
            ['Ripple', 'Litecoin'],
            ['Ver todas']
        ])
        .oneTime()
        .resize()
    );
});

// Comando /ajuda para mostrar ajuda
bot.command('ajuda', (ctx) => {
    ctx.reply('Use os comandos ou digite "@CryptoBot nome_da_moeda" para ver informações sobre uma criptomoeda.\n\n' +
              'Comandos disponíveis:\n' +
              '/start - Iniciar o bot e ver opções\n' +
              '/ajuda - Mostrar esta mensagem de ajuda');
});

// Comando /preco para mostrar o preço de uma criptomoeda específica
bot.command('preco', async (ctx) => {
    const coin = ctx.message.text.split(' ')[1];
    if (!coin) {
        ctx.reply('Por favor, especifique uma criptomoeda válida após o comando /preco.');
        return;
    }
    try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${coin.toLowerCase()}`);
        const { data } = response.data;
        if (data) {
            ctx.reply(`Preço do ${data.name} (${data.symbol}):\n$${Number(data.priceUsd).toFixed(2)}`);
        } else {
            ctx.reply(`Não foi possível encontrar informações para ${coin}. Certifique-se de digitar o nome correto.`);
        }
    } catch (error) {
        console.error('Erro ao obter preço da criptomoeda:', error);
        ctx.reply('Desculpe, ocorreu um erro ao obter o preço da criptomoeda.');
    }
});

// Comando para manipular consultas inline de criptomoedas
bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query.trim().toLowerCase();
    if (query === '') return;

    try {
        const response = await axios.get(`https://api.coincap.io/v2/assets?search=${query}&limit=5`);
        const coins = response.data.data;
        const results = coins.map((coin) => ({
            type: 'article',
            id: coin.id,
            title: coin.name,
            description: coin.symbol,
            input_message_content: {
                message_text: `Nome: ${coin.name}\nSímbolo: ${coin.symbol}\nPreço: $${Number(coin.priceUsd).toFixed(2)}`,
            },
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Ver mais', url: `https://coincap.io/assets/${coin.id}` }]
                ]
            }
        }));

        ctx.answerInlineQuery(results);
    } catch (error) {
        console.error('Erro ao buscar criptomoedas:', error);
        ctx.answerInlineQuery([]);
    }
});

bot.launch();
console.log('Crypto Bot está rodando...');
