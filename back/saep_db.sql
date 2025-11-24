-- Criar banco de dados
DROP DATABASE IF EXISTS saep_db;
CREATE DATABASE saep_db;
USE saep_db;

-- ===============================
-- TABELA: usuarios
-- ===============================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

-- Inserts (até 6)
INSERT INTO usuarios (nome, login, senha) VALUES
('Ana Pereira', 'ana.p', '123'),
('João Silva', 'joao.s', '123'),
('Maria Oliveira', 'maria.o', '123'),
('Pedro Santos', 'pedro.s', '123'),
('Julia Andrade', 'julia.a', '123'),
('Lucas Rocha', 'lucas.r', '123');


-- ===============================
-- TABELA: produtos
-- ===============================
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    atual_produto INT NOT NULL,
    descricao VARCHAR(255),
    min_estoque INT NOT NULL
);

-- Inserts (até 6)
INSERT INTO produtos (nome, atual_produto, descricao, min_estoque) VALUES
('Smartphone X100', 50, 'Smartphone 128GB', 10),
('Notebook Pro 15', 20, 'Notebook 15" 8GB RAM', 5),
('Smart TV 50"', 10, 'TV 4K HDR', 3),
('Tablet Lite 10', 15, 'Tablet 10" 64GB', 5),
('Fone Bluetooth A1', 80, 'Fone sem fio', 20),
('Roteador DualBand', 40, 'Roteador 5GHz', 8);


-- ===============================
-- TABELA: movimentacoes
-- ===============================
CREATE TABLE movimentacoes (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    tipo_movimentacao ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATETIME NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Inserts (até 6)
INSERT INTO movimentacoes (id_usuario, id_produto, tipo_movimentacao, quantidade, data_movimentacao) VALUES
(1, 1, 'entrada', 10, '2024-10-01 10:00:00'),
(2, 2, 'saida', 2, '2024-10-02 11:30:00'),
(3, 3, 'entrada', 5, '2024-10-03 14:15:00'),
(4, 4, 'saida', 3, '2024-10-04 09:20:00'),
(5, 5, 'entrada', 20, '2024-10-05 16:45:00'),
(6, 6, 'saida', 4, '2024-10-06 08:10:00');
