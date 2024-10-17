const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '510410',
  database: 'login_system',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Rota de registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erro no servidor.' });
    if (result.length > 0) return res.status(400).json({ message: 'Usuário já existe!' });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Erro ao criptografar a senha.' });

      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao registrar o usuário.' });
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
      });
    });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erro no servidor.' });
    if (result.length === 0) return res.status(400).json({ message: 'Usuário não encontrado.' });

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erro no servidor.' });
      if (!isMatch) return res.status(400).json({ message: 'Senha incorreta.' });

      const token = jwt.sign({ id: user.id, role: user.role }, 'secreta', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Token não fornecido!' });

  jwt.verify(token, 'secreta', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido!' });
    req.userId = decoded.id;
    req.userRole = decoded.role; // Adicionar o role do usuário
    next();
  });
}

// Rota protegida (Dashboard)
app.get('/dashboard.html', verifyToken, (req, res) => {
  if (req.userRole === 'admin') {
    res.json({ message: 'Bem-vindo ao dashboard de administrador!' });
  } else {
    res.json({ message: 'Bem-vindo ao dashboard de usuário!' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


