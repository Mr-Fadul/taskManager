const TaskRepository = require('./../repositories/task.repository');
const TaskService = require('./../services/task.service');

const { join } = require('path');
const filename = join(__dirname, '../../database', 'data.json');

const generateInstance = () => {
    const taskRepository = new TaskRepository({ file: filename });
    const taskService = new TaskService({ taskRepository });

    return taskService;
}
module.exports = { generateInstance };