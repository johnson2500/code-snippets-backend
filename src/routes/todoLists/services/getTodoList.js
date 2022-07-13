import { appLogger } from '../../../helpers/logger';
import Todos from '../../../models/todoList';

export default async (req, res) => {
  try {
    const { ownerId, params: { id, projectId } } = req;
    appLogger(`Getting todo list ${id} for ${ownerId}`);
    const todos = new Todos(ownerId, projectId);
    const data = await todos.getTodoList(id);

    res.send(data.data());
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
