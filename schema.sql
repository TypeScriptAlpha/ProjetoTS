-- CRIE E ACESSE O DATABASE
CREATE DATABASE alpha;
\c alpha

-- ADICIONE A EXTENSÃO UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CRIE AS TABELAS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    squad UUID,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE squads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    leader UUID,
    FOREIGN KEY (leader) REFERENCES users(id)
);

ALTER TABLE users
ADD CONSTRAINT fk_squad FOREIGN KEY (squad) REFERENCES squads(id);

-- CRIE UM USUÁRIO
CREATE USER nome_de_usuario WITH PASSWORD 'suasenha';
ALTER USER nome_de_usuario SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE alpha TO nome_de_usuario;

-- DADOS PARA ACESSAR O BANCO
DB_HOST= SEU IP
DB_NAME= 'alpha'
DB_USER= 'nome_de_usuario'
DB_PASSWORD= 'suasenha'
DB_PORT= 5432