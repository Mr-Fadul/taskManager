
const { readFile, writeFile } = require('fs/promises');

class TaskRepository { 
    constructor({ file }) {
        this.file = file;
    }

    async _currentFileContent() {
        try {
            return JSON.parse( await readFile(this.file, 'utf-8'));
        } catch (error) {
            console.error('Error reading file:', error);
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    async find(id) {
        const all =  await this._currentFileContent();
        if(!id) return all

        return all.find(item => item.id === id);
    }

    async create(task) {
        return this.find().then(all => {
            const id = all.length + 1;
            const newTask = { id, ...task };
            all.push(newTask);
            writeFile(this.file, JSON.stringify(all, null, 2))
                .then(() => newTask);
            return newTask.id
        });
    }
}

module.exports = TaskRepository;

const taskRepository = new TaskRepository({ file: '../../database/data.json' });
