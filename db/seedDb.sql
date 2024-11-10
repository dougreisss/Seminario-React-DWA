USE railway;

-- Limpar tabelas (remover todos os dados existentes)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE book_genres;
TRUNCATE TABLE reviews;
TRUNCATE TABLE ratings;
TRUNCATE TABLE books;
TRUNCATE TABLE authors;
TRUNCATE TABLE genres;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Inserir usuários
INSERT INTO users (username, email, password) VALUES
('leitor1', 'leitor1@example.com', 'senha123'),
('leitor2', 'leitor2@example.com', 'senha456'),
('leitor3', 'leitor3@example.com', 'senha789');

-- Inserir autores
INSERT INTO authors (name, bio, birth_date) VALUES
('George Orwell', 'Autor de 1984 e A Revolução dos Bichos.', '1903-06-25'),
('J.K. Rowling', 'Criadora do universo de Harry Potter.', '1965-07-31'),
('J.R.R. Tolkien', 'Autor de O Senhor dos Anéis.', '1892-01-03');

-- Inserir gêneros
INSERT INTO genres (name) VALUES
('Ficção'),
('Fantasia'),
('Aventura'),
('Distopia'),
('Mistério');

-- Inserir livros
INSERT INTO books (title, author_id, synopsis, publication_date, cover_image, average_rating) VALUES
('1984', 1, 'Um futuro distópico onde o governo controla tudo e todos.', '1949-06-08', '1984.jpg', 4.9),
('Harry Potter e a Pedra Filosofal', 2, 'Um jovem bruxo descobre seu destino ao entrar na Escola de Magia e Bruxaria de Hogwarts.', '1997-06-26', 'hp1.jpg', 4.8),
('O Senhor dos Anéis: A Sociedade do Anel', 3, 'Uma jornada épica para destruir um anel que pode dominar o mundo.', '1954-07-29', 'lotr1.jpg', 4.7);

-- Inserir associações entre livros e gêneros
INSERT INTO book_genres (book_id, genre_id) VALUES
(1, 4), -- 1984 - Distopia
(2, 2), -- Harry Potter - Fantasia
(3, 3); -- O Senhor dos Anéis - Aventura

-- Inserir resenhas
INSERT INTO reviews (book_id, user_id, review_text) VALUES
(1, 1, 'Um livro impactante e perturbador que faz refletir sobre o controle do governo.'),
(2, 1, 'Uma história mágica e envolvente para todas as idades.'),
(3, 2, 'Uma leitura épica e emocionante que é um marco na literatura de fantasia.');

-- Inserir avaliações
INSERT INTO ratings (book_id, user_id, rating) VALUES
(1, 1, 5),
(2, 1, 5),
(3, 2, 4);
