const http = require('http');
const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

const TaskFactory = require('./factories/task.factory');
const taskService = TaskFactory.generateInstance();
const Task = require('./entities/task.entity');
const routes = {
  '/tasks:get': async (request, response) => {
    const { id } = request.queryString;
    const tasks = await taskService.find(id);
    response.writeHead(200, DEFAULT_HEADER);
    response.write(JSON.stringify({ results: tasks }));
    return response.end();
  },
  '/tasks:post': async (request, response) => {
    try {
      for await (const data of request) {
        const taskData = JSON.parse(data);
        const task = new Task(taskData);
        const { error, valid } = task.isValid();

        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ error: error.join(',') }));
          return response.end(); // encerra aqui a função, evitando erro
        }
        const id = await taskService.create(task);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({ success: 'Task Created', id }));
        //return usado pois é apenas um envio por request, se fosse um envio de stream, não poderia usar return
        return response.end();
      }
    } catch (error) {
      console.error('Erro no POST /tasks:', error);
      return handlerError(response)(error);
    }
  },

  default: (request, response) => {
    response.writeHead(200, DEFAULT_HEADER);
    response.write('Hello World! Bem-vindo ao TaskManager.');
    response.end();
  }
}

const handlerError = response => {
  return error => {
    console.error('Erro no servidor:', error);
    if (!response.headersSent) {
      response.writeHead(500, DEFAULT_HEADER);
      return response.end(JSON.stringify({ error: 'Erro interno do servidor' }));
    }
  } 
}

const handler = (request, response) => {
  const { method, url } = request;
  const [first, route, id] = url.split('/');
  request.queryString = { id: isNaN(id) ? id : Number(id) };
  const key = `/${route}:${method.toLowerCase()}`;
  //response.writeHead(200, DEFAULT_HEADER);
  const chosen = routes[key] || routes.default;
  return chosen(request, response).catch(handlerError(response));
}

http.createServer(handler).listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
});