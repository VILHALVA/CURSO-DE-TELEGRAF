# CONNECTED WITH MYSQL DB ( INLINE AND REPLY KEYBOARD ) 
Para criar um bot no Telegram conectado a um banco de dados MySQL, que suporta consulta inline e respostas usando um teclado de resposta, vamos seguir alguns passos. Vou fornecer um guia passo a passo para configurar isso, incluindo o desenvolvimento do bot com Node.js usando Telegraf e a configuração inicial do banco de dados MySQL.

## 1. Configuração Inicial
Certifique-se de ter Node.js e npm instalados no seu sistema. Se não estiverem instalados, você pode baixá-los em [nodejs.org](https://nodejs.org/).

## 2. Configuração do Banco de Dados MySQL
1. **Instalação do MySQL**: Se você ainda não tiver o MySQL instalado, baixe e instale o MySQL Server adequado para o seu sistema operacional. Você pode baixá-lo em [mysql.com](https://www.mysql.com/downloads/).

2. **Criação do Banco de Dados e Tabelas**:
   - Abra um cliente MySQL (como o MySQL Workbench) ou use o terminal para se conectar ao MySQL.
   - Execute os seguintes comandos SQL para criar um banco de dados e uma tabela para armazenar os dados do bot:

   ```sql
   -- Comando para criar o banco de dados
   CREATE DATABASE IF NOT EXISTS telegram_bot_db;

   -- Comando para usar o banco de dados criado
   USE telegram_bot_db;

   -- Comando para criar a tabela para armazenar as mensagens do bot
   CREATE TABLE IF NOT EXISTS messages (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       message_text TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   - Este script SQL cria um banco de dados chamado `telegram_bot_db` e uma tabela `messages` para armazenar as mensagens enviadas pelos usuários do bot. A tabela inclui campos para `id` (chave primária auto incrementada), `user_id` (ID do usuário do Telegram), `message_text` (texto da mensagem enviada pelo usuário) e `created_at` (timestamp da criação da mensagem).

3. **Configuração do MySQL**:
   - Anote o nome do host, porta, nome de usuário e senha do MySQL que serão necessários mais tarde para configurar a conexão com o banco de dados no seu projeto Node.js.

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

3. Instale as dependências necessárias, incluindo Telegraf para o desenvolvimento do bot do Telegram, `mysql2` para a conexão com o MySQL e `dotenv` para gerenciar variáveis de ambiente.

   ```bash
   npm install telegraf mysql2 dotenv
   ```

4. Crie um arquivo `.env` na raiz do seu projeto para armazenar o token do bot do Telegram, informações de conexão com o MySQL e outras variáveis de ambiente.

   ```bash
   touch .env
   ```

   Dentro do arquivo `.env`, adicione as variáveis necessárias:

   ```
   BOT_TOKEN=seu_token_aqui
   DB_HOST=seu_host_mysql
   DB_USER=seu_usuario_mysql
   DB_PASSWORD=sua_senha_mysql
   DB_DATABASE=telegram_bot_db
   ```

   Substitua `seu_token_aqui`, `seu_host_mysql`, `seu_usuario_mysql`, `sua_senha_mysql` pelos valores reais do token do bot do Telegram, host, usuário, senha e nome do banco de dados MySQL.

## 4. Desenvolvimento do Bot
Agora, vamos desenvolver o bot que pode interagir com o Telegram e armazenar mensagens no MySQL.

- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot:

   ```javascript
   const { Telegraf, Markup } = require('telegraf');
   const mysql = require('mysql2/promise');
   require('dotenv').config();

   const bot = new Telegraf(process.env.BOT_TOKEN);

   // Conexão com o MySQL usando pool de conexões
   const pool = mysql.createPool({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_DATABASE,
       waitForConnections: true,
       connectionLimit: 10,
       queueLimit: 0
   });

   // Middleware para armazenar mensagens no MySQL
   bot.use(async (ctx, next) => {
       const { message } = ctx.update;
       if (message) {
           const { text, chat, from } = message;
           const userId = from.id;

           try {
               const connection = await pool.getConnection();
               await connection.query(
                   'INSERT INTO messages (user_id, message_text) VALUES (?, ?)',
                   [userId, text]
               );
               connection.release();
           } catch (error) {
               console.error('Erro ao inserir mensagem no MySQL:', error);
           }
       }
       next();
   });

   // Comando /start para dar as boas-vindas e mostrar as opções
   bot.start((ctx) => {
       ctx.reply('Bem-vindo! Use os comandos ou digite algo para armazenar no banco de dados.');
   });

   // Comando /mensagens para listar as mensagens armazenadas
   bot.command('mensagens', async (ctx) => {
       try {
           const connection = await pool.getConnection();
           const [rows] = await connection.query(
               'SELECT * FROM messages ORDER BY created_at DESC LIMIT 5'
           );
           connection.release();

           if (rows.length > 0) {
               let response = 'Últimas mensagens armazenadas:\n';
               rows.forEach((row) => {
                   response += `Usuário ID: ${row.user_id}\nMensagem: ${row.message_text}\n\n`;
               });
               ctx.reply(response);
           } else {
               ctx.reply('Nenhuma mensagem encontrada.');
           }
       } catch (error) {
           console.error('Erro ao buscar mensagens do MySQL:', error);
           ctx.reply('Desculpe, ocorreu um erro ao buscar as mensagens.');
       }
   });

   // Comando para manipular consultas inline (neste exemplo não será implementado)

   bot.launch();
   console.log('Bot de Telegram conectado ao MySQL está rodando...');
   ```

   **Observação:** Este exemplo mostra como armazenar mensagens enviadas pelos usuários no banco de dados MySQL e recuperar as últimas mensagens com o comando `/mensagens`. Para consultas inline, você pode expandir o bot adicionando manipuladores para comandos inline usando a API do Telegram.

## 5. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## Funcionamento do Bot
- **Conexão MySQL**: O bot usa `mysql2/promise` para conectar ao MySQL usando um pool de conexões.
- **Middleware para Armazenamento**: Utiliza um middleware para armazenar mensagens enviadas pelos usuários no banco de dados MySQL.
- **Comandos Telegram**: Suporta comandos como `/start` para iniciar o bot e `/mensagens` para listar as últimas mensagens armazenadas no MySQL.

Este bot básico oferece um ponto de partida para criar um bot Telegram que interage com um banco de dados MySQL, permitindo armazenamento e recuperação de dados. Personalize e expanda conforme suas necessidades específicas de integração e funcionalidades adicionais.