import postTodo from './services/postTodoList';
import taskSchemas from './schemas/todoSchemas';
import validator from '../../helpers/validator';
import getTodo from './services/getTodoList';
import addTodoListItem from './services/postTodoItem';
import getTodoListItem from './services/getTodoItem';
import getTodos from './services/getTodos';

export default (app) => {
  // TODO LISTS
  app.post(
    '/todo-list',
    validator(taskSchemas.postTodoSchema),
    postTodo,
  );
  app.get(
    '/todo-list/:id',
    validator(taskSchemas.getTodoSchema),
    getTodo,
  );

  // TODO LIST ITEMS
  app.get(
    '/todo-list/:todoListId/item/:todoListItemId',
    validator(taskSchemas.getTodoItemSchema),
    getTodoListItem,
  );

  app.post(
    '/todo-list/:todoListId/item',
    validator(taskSchemas.postTodoListItemSchema),
    addTodoListItem,
  );

  // Get All Todos And List
  app.get(
    '/todo-list/:todoListId/items',
    validator(taskSchemas.getTodosSchema),
    getTodos,
  );
};
