const express = require('express');
const router = express.Router();

// Rota Home
router.get('/', (req, res) => {
    res.send('Hello World! Bem-vindo ao TaskManager.');
});

module.exports = router;
