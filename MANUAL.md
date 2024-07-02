# MANUAL
## 1. INSTALAÇÃO DO NODE.JS E NPM
Antes de começar, você precisa ter o Node.js e o npm (Node Package Manager) instalados no seu sistema. Você pode baixá-los e instalá-los a partir do [site oficial do Node.js](https://nodejs.org/).

## 2. CRIAÇÃO DO BOT NO TELEGRAM:
1. No Telegram, procure pelo [BotFather](https://t.me/BotFather) e inicie uma conversa com ele.
2. Use o comando `/start` para iniciar.
3. Use o comando `/newbot` para criar um novo bot.
4. Siga as instruções para dar um nome e um nome de usuário para o seu bot.
5. Ao final, você receberá um token de API para o seu bot. Guarde este token em um lugar seguro, pois precisaremos dele mais tarde.

## 3. CONFIGURAÇÃO DO PROJETO NODE.JS:
1. Crie uma nova pasta para o seu projeto e navegue até ela no terminal.
   
   ```bash
   mkdir meu-primeiro-bot
   cd meu-primeiro-bot
   ```

2. Inicialize um novo projeto Node.js.

   ```bash
   npm init -y
   ```

3. Instale a biblioteca Telegraf.

   ```bash
   npm install telegraf
   ```

## 4. CRIAÇÃO DO PRIMEIRO BOT:
1. Crie um arquivo chamado `bot.js` na pasta do seu projeto.

   ```bash
   touch bot.js
   ```

2. Abra o arquivo `bot.js` em um editor de texto ou IDE de sua preferência e adicione o seguinte código:

   ```javascript
   const { Telegraf } = require('telegraf');
   
   // Substitua 'YOUR_BOT_TOKEN' pelo token que você recebeu do BotFather
   const bot = new Telegraf('YOUR_BOT_TOKEN');
   
   bot.start((ctx) => ctx.reply('Bem-vindo!'));
   bot.help((ctx) => ctx.reply('Envie-me um sticker!'));
   bot.on('sticker', (ctx) => ctx.reply('👍'));
   bot.hears('oi', (ctx) => ctx.reply('Olá!'));
   
   bot.launch();
   
   console.log('Bot está rodando...');
   ```

   Certifique-se de substituir `'YOUR_BOT_TOKEN'` pelo token de API que você recebeu do BotFather.

## 5. EXECUTANDO O BOT:
1. No terminal, execute o seguinte comando para iniciar o bot:

   ```bash
   node bot.js
   ```

2. Você verá a mensagem "Bot está rodando..." no terminal, indicando que o bot foi iniciado com sucesso.

## 6. TESTANDO O BOT:
1. Abra o Telegram e procure pelo seu bot usando o nome de usuário que você definiu no BotFather.
2. Inicie uma conversa com o seu bot.
3. Teste os seguintes comandos e interações:
   - Envie `/start` e o bot deve responder com "Bem-vindo!".
   - Envie `/help` e o bot deve responder com "Envie-me um sticker!".
   - Envie um sticker e o bot deve responder com "👍".
   - Envie a mensagem "oi" e o bot deve responder com "Olá!".

## CONCLUSÃO:
Parabéns! Você criou e configurou com sucesso o seu primeiro bot do Telegram usando Telegraf. 