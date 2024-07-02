# CRYPTO BOT ( INLINE E REPLY KEYBOARD )
Para criar um bot de criptomoedas no Telegram que suporta pesquisa inline e respostas usando um teclado de resposta, vamos utilizar o Node.js com Telegraf. Esse bot permitirá aos usuários consultar o preço das principais criptomoedas e receber informações básicas sobre elas. Aqui está um guia passo a passo para configurar isso:

## 1. Configuração Inicial
Certifique-se de ter Node.js e npm instalados no seu sistema. Se não estiverem instalados, você pode baixá-los em [nodejs.org](https://nodejs.org/).

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

3. Instale as dependências necessárias, incluindo Telegraf para o desenvolvimento do bot do Telegram, `axios` para fazer requisições HTTP e `dotenv` para gerenciar variáveis de ambiente.

   ```bash
   npm install telegraf axios dotenv
   ```

4. Crie um arquivo `.env` na raiz do seu projeto para armazenar o token do bot do Telegram e outras variáveis de ambiente.

   ```bash
   touch .env
   ```

   Dentro do arquivo `.env`, adicione seu token do bot do Telegram da seguinte forma:

   ```
   BOT_TOKEN=seu_token_aqui
   ```

## 3. Desenvolvimento do Bot
Agora, vamos desenvolver o bot que pode fornecer informações sobre criptomoedas.

- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot:

   ```javascript
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
   ```

   **Observação:** Certifique-se de substituir `seu_token_aqui` pelo token real do seu bot do Telegram. Este exemplo utiliza a API pública CoinCap para obter informações sobre criptomoedas.

## 4. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## 5. Testando o Bot
1. No Telegram, procure pelo seu bot pelo nome de usuário que você definiu no BotFather.
2. Experimente os comandos `/start`, `/ajuda` e `/preco Bitcoin` para ver as funcionalidades básicas.
3. Experimente digitar `@CryptoBot Bitcoin` na caixa de mensagem para ver informações sobre o Bitcoin de forma inline.

## Funcionamento do Bot
- **Comandos e Teclado de Resposta**: O bot responde aos comandos `/start`, `/ajuda` e `/preco` para iniciar, obter ajuda e verificar o preço de uma criptomoeda específica, respectivamente.
- **Consulta Inline**: Os usuários podem digitar `@CryptoBot nome_da_moeda` na caixa de mensagem para obter informações inline sobre uma criptomoeda.
- **Interação com API Externa**: Utiliza a API CoinCap para obter informações sobre criptomoedas e mostra o preço atual.

Este bot básico oferece um ponto de partida para criar um bot mais complexo que interage com informações sobre criptomoedas no Telegram, oferecendo consulta inline e comandos interativos para os usuários.