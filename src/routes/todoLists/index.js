import postTodo from './services/postTodoList';
import taskSchemas from './schemas/todoSchemas';
import validator from '../../helpers/validator';
import getTodo from './services/getTodoList';
import getTodosAndItems from './services/getTodosAndItems';
import getTodoLists from './services/getTodoLists';

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

  app.get(
    '/project/:projectId/todo-lists',
    validator(taskSchemas.getTodosSchema),
    getTodoLists,
  );

  app.get(
    '/todo-list/all',
    validator(taskSchemas.getTodoSchema),
    getTodosAndItems,
  );
};
