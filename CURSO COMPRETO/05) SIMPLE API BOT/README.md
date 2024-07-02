# SIMPLE API BOT - USE EXTERNAL & INTERNAL API 
## 1. Configuração Inicial
Certifique-se de ter o Node.js e npm instalados no seu sistema. Se não estiverem instalados, você pode baixá-los em [nodejs.org](https://nodejs.org/).

## 2. Configuração do Projeto
1. Crie um novo diretório para o seu projeto do bot e navegue até ele.

   ```bash
   mkdir CODIGO
   cd CODIGO
   ```

2. Inicialize um novo projeto Node.js.

   ```bash
   npm init -y
   ```

3. Instale as dependências necessárias, incluindo Telegraf para o desenvolvimento do bot do Telegram e `axios` para fazer requisições HTTP a APIs externas.

   ```bash
   npm install telegraf axios dotenv
   ```

4. Crie um arquivo `.env` na raiz do seu projeto para armazenar o token do bot do Telegram e outras variáveis de ambiente, se necessário.

   ```bash
   touch .env
   ```

   Dentro do arquivo `.env`, adicione seu token do bot do Telegram da seguinte forma:

   ```
   BOT_TOKEN=seu_token_aqui
   ```

## 3. Desenvolvimento do Bot
Agora, vamos desenvolver o bot que pode interagir com APIs externas e internas.

- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot:

   ```javascript
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
   ```

   **Observação:** Substitua `'https://api.example.com/dados'` pela URL da API externa da qual você deseja obter dados.

## 4. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## 5. Testando o Bot
1. No Telegram, procure pelo seu bot pelo nome de usuário que você definiu no BotFather.
2. Envie um dos comandos: `/dados` para obter dados da API externa ou `/informacao` para receber uma informação interna fixa.
3. O bot deve responder com os dados da API externa ou a informação interna, conforme configurado.

## Funcionamento do Bot
Neste exemplo, o bot está configurado para responder a dois comandos: `/dados` para obter dados de uma API externa usando o módulo `axios`, e `/informacao` para enviar uma mensagem fixa diretamente do código.

