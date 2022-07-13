import { appLogger } from '../../../helpers/logger';
import TodoListItem from '../../../models/todoItem';

export default async (req, res) => {
  try {
    console.log('here');
    const { ownerId, body, params } = req;
    const { todoListId, projectId } = params;
    console.log(todoListId, projectId);

    const todoListItem = new TodoListItem(ownerId, projectId, todoListId);
    const data = await todoListItem.addTodoListItem(body);

    res.send({ id: data.id });
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
