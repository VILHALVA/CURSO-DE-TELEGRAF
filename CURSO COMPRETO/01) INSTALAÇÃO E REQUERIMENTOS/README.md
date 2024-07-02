# INSTALAÇÃO E REQUERIMENTOS
Para começar a criar bots do Telegram com Telegraf, você precisa ter o Node.js e npm instalados no seu sistema. A seguir, estão os passos detalhados para a instalação e configuração dos requisitos.

## 1. Instalando Node.js e npm
**Para Windows e macOS:**

1. Acesse o [site oficial do Node.js](https://nodejs.org/).
2. Baixe a versão LTS recomendada para a maioria dos usuários.
3. Siga as instruções do instalador para instalar o Node.js e o npm no seu sistema.

**Para Linux (Debian/Ubuntu):**

1. Abra o terminal.
2. Atualize os pacotes do sistema.

   ```bash
   sudo apt update
   sudo apt upgrade
   ```

3. Instale o Node.js e o npm.

   ```bash
   sudo apt install nodejs npm
   ```

## 2. Verificando a Instalação
Para verificar se a instalação foi bem-sucedida, execute os seguintes comandos no terminal:

```bash
node -v
npm -v
```

Você deve ver a versão do Node.js e do npm instalada no seu sistema.

## 3. Configuração do Projeto Node.js
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

Agora, você está pronto para criar e configurar o seu bot do Telegram utilizando a biblioteca Telegraf. 

