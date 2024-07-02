# ECHO BOT
Para criar um "eco bot" que simplesmente ecoa todas as mensagens enviadas pelos usuários para o console, podemos modificar o exemplo anterior para capturar todas as mensagens recebidas e exibi-las no terminal. Aqui está como você pode fazer isso:

## 1. Configuração Inicial
Certifique-se de ter o Node.js e npm instalados, conforme mencionado anteriormente.

## 2. Criando o Projeto
1. Crie uma nova pasta para o seu projeto e navegue até ela no terminal.

   ```bash
   mkdir CODIGO
   cd CODIGO
   ```

2. Inicialize um novo projeto Node.js.

   ```bash
   npm CODIGO
   ```

3. Instale a biblioteca Telegraf.

   ```bash
   npm install telegraf
   ```

4. Crie um arquivo `main.js` para o código do seu bot.

   ```bash
   touch main.js
   ```

## 3. Desenvolvendo o Bot
Abra o arquivo `main.js` em um editor de texto ou IDE e adicione o seguinte código:

```javascript
const { Telegraf } = require('telegraf');

// Substitua 'YOUR_BOT_TOKEN' pelo token que você recebeu do BotFather
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Middleware para ecoar mensagens para o console
bot.on('text', (ctx) => {
    console.log(`Mensagem recebida: ${ctx.message.text}`);
});

// Iniciar o bot
bot.launch();

console.log('Ecobot Eco está rodando...');
```

## 4. Executando o Bot
No terminal, execute o comando abaixo para iniciar o bot:

```bash
node main.js
```

## 5. Testando o Bot
1. No Telegram, procure pelo seu bot pelo nome de usuário que você definiu no BotFather.
2. Envie mensagens de texto para o bot.
3. No terminal onde o bot está sendo executado, você verá as mensagens sendo exibidas, seguidas do texto que você enviou.

## Funcionamento do Eco Bot
Neste exemplo, todas as mensagens de texto enviadas pelos usuários são capturadas pelo middleware `bot.on('text', ...)`. Este middleware simplesmente exibe cada mensagem recebida no console. Isso permite que você veja instantaneamente todas as interações dos usuários com o bot no seu ambiente de desenvolvimento.

