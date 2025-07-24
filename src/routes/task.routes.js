const express = require('express');
const router = express.Router();

const TaskFactory = require('../factories/task.factory');
const taskService = TaskFactory.generateInstance();
const Task = require('../entities/task.entity');

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.find();
    res.status(200).json({ results: tasks });
  } catch (error) {
    console.error('Erro no GET /tasks:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  let { id } = req.params;
  id = isNaN(Number(id)) ? id : Number(id);
  try {
    const tasks = await taskService.find(id);
    res.status(200).json({ results: tasks });
  } catch (error) {
    console.error('Erro no GET /tasks/:id:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const taskData = req.body;
    const task = new Task(taskData);
    const { error, valid } = task.isValid();
    if (!valid) {
      return res.status(400).json({ error: error.join(',') });
    }
    const id = await taskService.create(task);
    res.status(201).json({ success: 'Task Created', id });
  } catch (error) {
    console.error('Erro no POST /tasks:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
