# BOT DE FATOS SOBRE A COVID 19 (LEIA A API DO GOOGLE SHEET)
Para criar um bot que forneça fatos sobre a Covid-19 lendo dados de uma planilha do Google Sheets, podemos seguir um processo que envolve usar o Node.js com Telegraf para a interação com o Telegram e a biblioteca `google-spreadsheet` para acessar os dados da planilha. Aqui está como configurar isso passo a passo:

## 1. Configuração Inicial
Certifique-se de ter Node.js e npm instalados no seu sistema. Se não estiverem instalados, você pode baixá-los em [nodejs.org](https://nodejs.org/).

## 2. Criar e Configurar a Planilha do Google Sheets
1. Crie uma planilha no Google Sheets com os fatos sobre a Covid-19. Ela deve ter uma estrutura simples, como uma coluna para os fatos e outra para detalhes adicionais, por exemplo.

2. Compartilhe a planilha e obtenha o ID da planilha e a ID da folha. O ID da planilha pode ser encontrado na URL da planilha entre `/d/` e `/edit`.

## 3. Configuração do Projeto
1. Crie um novo diretório para o projeto do bot e navegue até ele.

   ```bash
   mkdir CODIGO
   cd CODIGO
   ```

2. Inicialize um novo projeto Node.js.

   ```bash
   npm init -y
   ```

3. Instale as dependências necessárias, incluindo Telegraf para o desenvolvimento do bot do Telegram, `dotenv` para gerenciar variáveis de ambiente e `google-spreadsheet` para acessar a planilha do Google Sheets.

   ```bash
   npm install telegraf dotenv google-spreadsheet
   ```

4. Crie um arquivo `.env` na raiz do seu projeto para armazenar o token do bot do Telegram, o ID da planilha do Google Sheets e outras variáveis de ambiente.

   ```bash
   touch .env
   ```

   Dentro do arquivo `.env`, adicione as seguintes variáveis:

   ```
   BOT_TOKEN=seu_token_aqui
   GOOGLE_SHEET_ID=id_da_sua_planilha
   GOOGLE_SHEET_SHEET_ID=id_da_sua_folha
   ```

   Substitua `seu_token_aqui`, `id_da_sua_planilha` e `id_da_sua_folha` pelos valores reais do token do bot do Telegram, ID da planilha do Google Sheets e ID da folha que você criou.

## 4. Desenvolvimento do Bot
Agora, vamos desenvolver o bot que pode ler os fatos sobre a Covid-19 da planilha do Google Sheets.

- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot:

   ```javascript
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
   ```

   **Observação:** Certifique-se de substituir `seu_token_aqui`, `id_da_sua_planilha`, `id_da_sua_folha`, `GOOGLE_CLIENT_EMAIL` e `GOOGLE_PRIVATE_KEY` com os valores reais. O `GOOGLE_CLIENT_EMAIL` e `GOOGLE_PRIVATE_KEY` são credenciais de serviço que você precisa configurar ao usar a API do Google Sheets com `google-spreadsheet`.

## 5. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## 6. Testando o Bot
1. No Telegram, procure pelo seu bot pelo nome de usuário que você definiu no BotFather.
2. Envie o comando `/fato`.
3. O bot deve responder com um fato aleatório sobre a Covid-19 obtido da planilha do Google Sheets.

## Funcionamento do Bot
Neste exemplo, o bot está configurado para responder ao comando `/fato` enviando um fato aleatório sobre a Covid-19, lido de uma planilha do Google Sheets. Ele usa a biblioteca `google-spreadsheet` para autenticação e acesso aos dados da planilha.

