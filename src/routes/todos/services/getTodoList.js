import { appLogger } from '../../../helpers/logger';
import Todos from '../../../models/todo';

const todos = new Todos();

export default async (req, res) => {
  try {
    const { ownerId, params: { id } } = req;
    appLogger(`Getting todo list ${id} for ${ownerId}`);

    const data = await todos.getTodoList(ownerId, id);

    res.send(data.data());
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
