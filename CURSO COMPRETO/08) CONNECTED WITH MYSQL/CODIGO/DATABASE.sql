-- Comando para criar o banco de dados
CREATE DATABASE telegram_bot_db;

-- Comando para usar o banco de dados criado
USE telegram_bot_db;

-- Comando para criar a tabela para armazenar as mensagens do bot
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
