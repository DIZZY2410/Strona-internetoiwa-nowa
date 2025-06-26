CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password_hash) VALUES
('Admin', 'admin@example.com', '$2b$10$r7zECszO2vCuxnxOQk4LLexULICwhf66A1VpzwuNFuIBqmoeZaZX6');

INSERT INTO posts (title, content, author_id) VALUES
('Welcome to the Blog', 'This is your first post. Edit or delete it, then start blogging!', 1);
