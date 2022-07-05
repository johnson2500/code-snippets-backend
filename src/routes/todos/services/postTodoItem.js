import { appLogger } from '../../../helpers/logger';
import Todos from '../../../models/todo';

const todos = new Todos();

export default async (req, res) => {
  try {
    const { ownerId, body, params } = req;
    const { todoListId } = params;

    const data = await todos.addTodoListItem(ownerId, todoListId, body);

    res.send({ id: data.id });
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
