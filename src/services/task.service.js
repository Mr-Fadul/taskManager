class TaskService {
  constructor({ taskRepository }) {
    this.taskRepository = taskRepository;
  }

  async find(id) {
    return this.taskRepository.find(id);
  }

  async create(task) {
    return this.taskRepository.create(task);
  }  
}

module.exports = TaskService;