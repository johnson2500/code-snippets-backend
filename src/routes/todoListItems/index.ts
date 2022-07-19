import taskSchemas from './schemas/todoListItemSchemas';
import validator from '../../helpers/validator';
import addTodoListItem from './services/postTodoListItems';
import getTodoListItem from './services/getTodoListItem';
import getTodos from './services/getTodoListItems';

export default (app): void => {
  app.get(
    '/project/:projectId/todo-list/:todoListId/todo-list-item/:id',
    validator(taskSchemas.getTodoItemSchema),
    getTodoListItem,
  );

  app.post(
    '/project/:projectId/todo-list/:todoListId/todo-list-item',
    validator(taskSchemas.postTodoListItemSchema),
    addTodoListItem,
  );

  // Get All Todos And List
  app.get(
    '/project/:projectId/todo-list/:todoListId/items',
    validator(taskSchemas.getTodosSchema),
    getTodos,
  );
};
