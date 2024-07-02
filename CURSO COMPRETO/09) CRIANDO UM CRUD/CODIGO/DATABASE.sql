-- Comando para criar o banco de dados
CREATE DATABASE telegram_crud_db;

-- Comando para usar o banco de dados criado
USE telegram_crud_db;

-- Comando para criar a tabela para armazenar nomes de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
