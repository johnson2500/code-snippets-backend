import { logger } from '@server/config/logger';
import TodoListItems from '../../../models/TodoListItems/todoListItems';
import {Response, Request} from 'express'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId, body, params } = req;
    const { todoListId, projectId } = params;

    const todoListItem = new TodoListItems(ownerId, projectId, todoListId);
    const data = await todoListItem.addTodoListItem(body);

    res.send({ id: data.id });
  } catch (error: any) {
    logger.info(error);
    res.status(500).send(error.message);
  }
};
