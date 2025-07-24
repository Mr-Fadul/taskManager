const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

// Middleware para definir Content-Type padrão
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Rota padrão
app.get('/', (req, res) => {
  res.send('Hello World! Bem-vindo ao TaskManager.');
});

const taskRoutes = require('./routes/task.routes');
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
});