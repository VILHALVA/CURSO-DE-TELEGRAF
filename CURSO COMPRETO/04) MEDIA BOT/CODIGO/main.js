const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Comando /foto para enviar uma foto
bot.command('foto', (ctx) => {
    ctx.replyWithPhoto({ source: 'caminho/para/sua/imagem.jpg' })
        .catch((err) => {
            console.error('Erro ao enviar foto:', err);
            ctx.reply('Desculpe, ocorreu um erro ao enviar a foto.');
        });
});

// Comando /audio para enviar um áudio
bot.command('audio', (ctx) => {
    ctx.replyWithAudio({ source: 'caminho/para/seu/audio.mp3' })
        .catch((err) => {
            console.error('Erro ao enviar áudio:', err);
            ctx.reply('Desculpe, ocorreu um erro ao enviar o áudio.');
        });
});

// Comando /musica para enviar uma música
bot.command('musica', (ctx) => {
    ctx.replyWithAudio({ source: 'caminho/para/sua/musica.mp3' })
        .catch((err) => {
            console.error('Erro ao enviar música:', err);
            ctx.reply('Desculpe, ocorreu um erro ao enviar a música.');
        });
});

// Comando /video para enviar um vídeo
bot.command('video', (ctx) => {
    ctx.replyWithVideo({ source: 'caminho/para/seu/video.mp4' })
        .catch((err) => {
            console.error('Erro ao enviar vídeo:', err);
            ctx.reply('Desculpe, ocorreu um erro ao enviar o vídeo.');
        });
});

// Comando /documento para enviar um documento
bot.command('documento', (ctx) => {
    ctx.replyWithDocument({ source: 'caminho/para/seu/documento.pdf' })
        .catch((err) => {
            console.error('Erro ao enviar documento:', err);
            ctx.reply('Desculpe, ocorreu um erro ao enviar o documento.');
        });
});

bot.launch();
console.log('Bot de Mídia (Tipos) está rodando...');
