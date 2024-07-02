# CHANNEL FEED BOT ( ZAPIER FETCH RSS )
Para criar um bot no Telegram que alimenta um canal com conteúdo obtido de um feed RSS usando Zapier, você precisará configurar algumas etapas tanto no Zapier quanto no seu bot Telegram usando Telegraf em Node.js. Aqui está um guia passo a passo para configurar isso:

## 1. Configuração Inicial
Certifique-se de ter Node.js e npm instalados no seu sistema. Se não estiverem instalados, você pode baixá-los em [nodejs.org](https://nodejs.org/).

## 2. Configuração do Zapier
1. **Criar um Zap**:
   - Acesse [Zapier](https://zapier.com/) e crie uma conta se ainda não tiver uma.
   - Crie um novo Zap e configure um gatilho para o feed RSS que deseja monitorar.

2. **Configurar o Gatilho**:
   - Escolha o gatilho RSS e configure-o para monitorar o feed desejado.

3. **Adicionar Ação**:
   - Adicione uma ação para enviar um Webhook.
   - Configure o Webhook para enviar os dados para o seu aplicativo ou servidor Node.js que processará os dados e enviará para o Telegram.

4. **Testar e Ativar**:
   - Teste o Zap para garantir que os dados estão sendo enviados corretamente para o Webhook.
   - Ative o Zap para começar a monitorar o feed RSS.

## 3. Configuração do Projeto Node.js
1. Crie um novo diretório para o projeto do bot e navegue até ele.

   ```bash
   mkdir CODIGO
   cd CODIGO
   ```

2. Inicialize um novo projeto Node.js.

   ```bash
   npm init -y
   ```

3. Instale as dependências necessárias, incluindo Telegraf para o desenvolvimento do bot do Telegram e `dotenv` para gerenciar variáveis de ambiente.

   ```bash
   npm install telegraf dotenv
   ```

4. Crie um arquivo `.env` na raiz do seu projeto para armazenar o token do bot do Telegram e outras variáveis de ambiente.

   ```bash
   touch .env
   ```

   Dentro do arquivo `.env`, adicione seu token do bot do Telegram da seguinte forma:

   ```
   BOT_TOKEN=seu_token_aqui
   ```

## 4. Desenvolvimento do Bot
Agora, vamos desenvolver o bot que irá receber os dados do Zapier e enviar para o canal do Telegram.

- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot:

   ```javascript
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
   ```

   **Observação:** Certifique-se de substituir `seu_token_aqui` pelo token real do seu bot do Telegram e `@seu_canal_aqui` pelo username ou ID do seu canal Telegram onde deseja enviar o conteúdo do feed RSS.

## 5. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## 6. Configuração Final no Zapier
- No Zapier, configure a ação do Webhook para enviar os dados para `https://seu-bot-webhook-url/feed`, onde `seu-bot-webhook-url` é a URL do seu servidor Node.js onde o bot está rodando (por exemplo, usando `ngrok` ou outro serviço para exposição local para a internet).

## Funcionamento do Bot
- O bot Telegram `Channel Feed Bot` recebe dados do Zapier via Webhook quando novas entradas são detectadas no feed RSS.
- Os dados recebidos são enviados para o canal Telegram especificado (`@seu_canal_aqui`).

Este bot básico oferece um ponto de partida para automatizar o envio de conteúdo de um feed RSS para um canal Telegram usando Zapier e Telegraf em Node.js. Certifique-se de ajustar e expandir conforme suas necessidades específicas de integração e personalização.