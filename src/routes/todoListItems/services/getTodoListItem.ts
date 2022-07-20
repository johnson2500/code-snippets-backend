import { logger } from '../../../config/logger';
import TodoItems from '../../../models/TodoListItems/todoListItems';
import { Response, Request} from 'express'

export default async (req:Request , res: Response): Promise<void> => {
  try {
    const { ownerId, params: { projectId, todoListId, id } } = req;
    console.log(req.params);
    const todoItem = new TodoItems(ownerId, projectId, todoListId, id);

    const data = await todoItem.getTodoListItem();

    res.send(data.data());
  } catch (error) {
    logger.info(error);
    res.status(500).send(error.message);
  }
};
