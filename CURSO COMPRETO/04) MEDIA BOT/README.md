# MEDIA BOT
Para criar um bot que envia diferentes tipos de mídias em resposta a comandos específicos, como fotos, áudio, música, vídeo e documentos, podemos configurar o Telegraf para lidar com cada tipo de mídia separadamente. Abaixo está um exemplo refeito que mostra como configurar o bot para enviar cada tipo de mídia em resposta a comandos diferentes.

## 1. Configuração Inicial
Certifique-se de ter Node.js e npm instalados no seu sistema. Se não estiverem instalados, você pode baixá-los em [nodejs.org](https://nodejs.org/).

## 2. Configuração do Projeto
1. Crie um novo diretório para o projeto do bot e navegue até ele.

   ```bash
   mkdir CODIGO
   cd CODIGO
   ```

2. Inicialize um novo projeto Node.js.

   ```bash
   npm init -y
   ```

3. Instale as dependências necessárias, incluindo Telegraf para o desenvolvimento do bot do Telegram e `dotenv` para gerenciar variáveis de ambiente de forma segura.

   ```bash
   npm install telegraf dotenv
   ```

4. Crie um arquivo `.env` na raiz do seu projeto para armazenar o token do bot do Telegram de forma segura.

   ```bash
   touch .env
   ```

   Dentro do arquivo `.env`, adicione seu token do bot do Telegram da seguinte forma:

   ```
   BOT_TOKEN=seu_token_aqui
   ```

## 3. Desenvolvimento do Bot
Agora, vamos desenvolver o bot que pode enviar diferentes tipos de mídias em resposta a comandos específicos.

- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot:

   ```javascript
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
   ```

   **Observação:** Substitua `'caminho/para/sua/imagem.jpg'`, `'caminho/para/seu/audio.mp3'`, `'caminho/para/sua/musica.mp3'`, `'caminho/para/seu/video.mp4'` e `'caminho/para/seu/documento.pdf'` pelos caminhos reais para os arquivos que você deseja enviar. Os arquivos devem estar acessíveis no sistema de arquivos onde o bot está sendo executado.

## 4. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## 5. Testando o Bot
1. No Telegram, procure pelo seu bot pelo nome de usuário que você definiu no BotFather.
2. Envie um dos comandos: `/foto`, `/audio`, `/musica`, `/video` ou `/documento`.
3. O bot deve responder com o arquivo correspondente que você configurou para enviar.

## Funcionamento do Bot de Mídia (Envio de Tipos Diferentes)
Neste exemplo, o bot está configurado para responder a comandos diferentes (`/foto`, `/audio`, `/musica`, `/video`, `/documento`) enviando diferentes tipos de mídia para o usuário. Você pode adaptar este exemplo para enviar outros tipos de mídia ou até mesmo integrar com APIs externas que fornecem conteúdo de mídia dinâmico.

