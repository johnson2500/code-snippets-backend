import getTodos from './services/getTodos';
import getTodo from './services/getTodo';
import postTodo from './services/postTodo';
import taskSchemas from './schemas/taskSchemas';
import validator from '../../helpers/validator';

export default (app) => {
  app.post(
    '/todo',
    validator(taskSchemas.postTodoSchema),
    postTodo,
  );
  app.get(
    '/todo/:todoId',
    validator(taskSchemas.getTodoSchema),
    getTodo,
  );
  app.get(
    '/todos',
    validator(taskSchemas.getTodosSchema),
    getTodos,
  );
};
