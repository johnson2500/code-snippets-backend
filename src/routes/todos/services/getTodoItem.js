import { appLogger } from '../../../helpers/logger';
import Todos from '../../../models/todo';

const todos = new Todos();

export default async (req, res) => {
  try {
    const { ownerId, params: { todoListId, todoListItemId } } = req;

    const data = await todos.getTodoListItem(ownerId, todoListId, todoListItemId);

    res.send(data.data());
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
