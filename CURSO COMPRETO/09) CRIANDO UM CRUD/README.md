# CRIANDO UM CRUD
Para criar um CRUD (Create, Read, Update, Delete) utilizando Node.js, Telegraf para o bot do Telegram, e MySQL como banco de dados, você precisará configurar rotas para lidar com cada operação básica do CRUD. Vou guiar você através dos passos para configurar um bot que permite criar, listar, atualizar e excluir registros em uma tabela do MySQL usando comandos no Telegram.

## 1. Configuração Inicial
Certifique-se de ter Node.js e npm instalados no seu sistema. Além disso, tenha o MySQL configurado e pronto para uso.

## 2. Instalação de Dependências
No diretório do seu projeto, inicialize um novo projeto Node.js e instale as dependências necessárias:

```bash
mkdir CODIGO
cd CODIGO
npm init -y
npm install telegraf mysql2 dotenv
```

## 3. Configuração do Banco de Dados MySQL
1. **Criação do Banco de Dados e Tabelas**:

   - Utilize os comandos SQL abaixo para criar um banco de dados e uma tabela para o exemplo do CRUD. Este exemplo utilizará uma tabela simples para armazenar nomes de usuários.

   ```sql
   -- Comando para criar o banco de dados
   CREATE DATABASE IF NOT EXISTS telegram_crud_db;

   -- Comando para usar o banco de dados criado
   USE telegram_crud_db;

   -- Comando para criar a tabela para armazenar nomes de usuários
   CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
   );
   ```

2. **Configuração do MySQL**:

   - Anote o nome do host, porta, nome de usuário e senha do MySQL que serão necessários para configurar a conexão com o banco de dados no seu projeto Node.js.

## 4. Desenvolvimento do Bot
- Crie um arquivo `main.js` e adicione o seguinte código para configurar o bot Telegram com suporte ao CRUD:

   ```javascript
   const { Telegraf } = require('telegraf');
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

   // Comando /start para dar as boas-vindas e mostrar as opções
   bot.start((ctx) => {
       ctx.reply('Bem-vindo ao bot CRUD! Use os comandos:\n' +
                 '/listar - Listar todos os usuários\n' +
                 '/adicionar [nome] - Adicionar um novo usuário\n' +
                 '/atualizar [id] [novo_nome] - Atualizar um usuário existente\n' +
                 '/excluir [id] - Excluir um usuário');
   });

   // Comando /listar para listar todos os usuários
   bot.command('listar', async (ctx) => {
       try {
           const connection = await pool.getConnection();
           const [rows] = await connection.query('SELECT * FROM users');
           connection.release();

           if (rows.length > 0) {
               let response = 'Usuários cadastrados:\n';
               rows.forEach((row) => {
                   response += `${row.id}: ${row.name}\n`;
               });
               ctx.reply(response);
           } else {
               ctx.reply('Nenhum usuário encontrado.');
           }
       } catch (error) {
           console.error('Erro ao buscar usuários do MySQL:', error);
           ctx.reply('Desculpe, ocorreu um erro ao buscar os usuários.');
       }
   });

   // Comando /adicionar para adicionar um novo usuário
   bot.command('adicionar', async (ctx) => {
       const name = ctx.message.text.split(' ')[1];
       if (!name) {
           ctx.reply('Por favor, especifique um nome para adicionar.');
           return;
       }
       try {
           const connection = await pool.getConnection();
           await connection.query('INSERT INTO users (name) VALUES (?)', [name]);
           connection.release();
           ctx.reply(`Usuário "${name}" adicionado com sucesso.`);
       } catch (error) {
           console.error('Erro ao adicionar usuário no MySQL:', error);
           ctx.reply('Desculpe, ocorreu um erro ao adicionar o usuário.');
       }
   });

   // Comando /atualizar para atualizar um usuário existente
   bot.command('atualizar', async (ctx) => {
       const params = ctx.message.text.split(' ');
       const id = params[1];
       const newName = params.slice(2).join(' ');
       if (!id || !newName) {
           ctx.reply('Por favor, especifique o ID e o novo nome para atualizar.');
           return;
       }
       try {
           const connection = await pool.getConnection();
           await connection.query('UPDATE users SET name = ? WHERE id = ?', [newName, id]);
           connection.release();
           ctx.reply(`Usuário com ID ${id} atualizado para "${newName}" com sucesso.`);
       } catch (error) {
           console.error('Erro ao atualizar usuário no MySQL:', error);
           ctx.reply('Desculpe, ocorreu um erro ao atualizar o usuário.');
       }
   });

   // Comando /excluir para excluir um usuário
   bot.command('excluir', async (ctx) => {
       const id = ctx.message.text.split(' ')[1];
       if (!id) {
           ctx.reply('Por favor, especifique o ID do usuário para excluir.');
           return;
       }
       try {
           const connection = await pool.getConnection();
           await connection.query('DELETE FROM users WHERE id = ?', [id]);
           connection.release();
           ctx.reply(`Usuário com ID ${id} excluído com sucesso.`);
       } catch (error) {
           console.error('Erro ao excluir usuário no MySQL:', error);
           ctx.reply('Desculpe, ocorreu um erro ao excluir o usuário.');
       }
   });

   bot.launch();
   console.log('Bot de Telegram com CRUD conectado ao MySQL está rodando...');
   ```

   **Observação:** Certifique-se de substituir `seu_token_aqui`, `seu_host_mysql`, `seu_usuario_mysql`, `sua_senha_mysql` pelos valores reais do token do seu bot do Telegram, host, usuário, senha e nome do banco de dados MySQL.

## 5. Executando o Bot
Para executar o bot:

1. No terminal, certifique-se de estar na pasta do projeto (`CODIGO`).
2. Execute o comando:

   ```bash
   node main.js
   ```

## Funcionamento do Bot
- **Conexão MySQL**: O bot usa `mysql2/promise` para conectar ao MySQL usando um pool de conexões.
- **Comandos Telegram**: Suporta comandos como `/listar` para listar todos os usuários, `/adicionar [nome]` para adicionar um novo usuário, `/atualizar [id] [novo_nome]` para atualizar um usuário existente e `/excluir [id]` para excluir um usuário.
- **Gerenciamento de Erros**: Lida com erros de forma básica, exibindo mensagens de erro adequadas ao usuário do bot.

Este bot básico oferece um ponto de partida para criar um bot Telegram que realiza operações CRUD simples usando um banco de dados MySQL.