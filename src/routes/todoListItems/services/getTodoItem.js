import { appLogger } from '../../../helpers/logger';
import TodoItem from '../../../models/todoItem';

export default async (req, res) => {
  try {
    const { ownerId, params: { projectId, todoListId, id } } = req;
    console.log(req.params);
    const todoItem = new TodoItem(ownerId, projectId, todoListId, id);

    const data = await todoItem.getTodoListItem(ownerId, todoListId, id);

    res.send(data.data());
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
