const { Telegraf } = require('telegraf');
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

bot.start((ctx) => {
    ctx.reply('Bem-vindo ao Bot de Fatos sobre a Covid-19! Use o comando /fato para obter um fato aleatório.');
});

bot.command('fato', async (ctx) => {
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        });
        await doc.loadInfo();
        const sheet = doc.sheetsById[process.env.GOOGLE_SHEET_SHEET_ID];
        const rows = await sheet.getRows();
        const randomFact = rows[Math.floor(Math.random() * rows.length)];
        ctx.reply(`Fato sobre a Covid-19:\n\n${randomFact.fato}\n\n${randomFact.detalhes}`);
    } catch (error) {
        console.error('Erro ao obter fato sobre a Covid-19:', error);
        ctx.reply('Desculpe, ocorreu um erro ao obter um fato sobre a Covid-19.');
    }
});

bot.launch();
console.log('Bot de Fatos sobre a Covid-19 está rodando...');
