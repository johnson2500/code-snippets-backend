import postTodo from './services/postTodoList';
import taskSchemas from './schemas/todoSchemas';
import validator from '../../helpers/validator';
import getTodo from './services/getTodoList';

export default (app) => {
  // TODO LISTS
  app.post(
    '/project/:projectId/todo-list',
    validator(taskSchemas.postTodoSchema),
    postTodo,
  );
  app.get(
    '/project/:projectId/todo-list/:id',
    validator(taskSchemas.getTodoSchema),
    getTodo,
  );
};
