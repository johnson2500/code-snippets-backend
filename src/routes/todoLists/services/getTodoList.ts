import { logger } from '@server/config/logger';
import Todos from '../../../models/TodoLists/todoLists';
import { Response, Request } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId, params: { id, projectId } } = req;
    logger.info(`Getting todo list ${id} for ${ownerId}`);
    const todos = new Todos(ownerId, projectId);
    const data = await todos.getTodoList(id);

    res.send(data.data());
  } catch (error) {
    logger.info(error);
    res.status(500).send(error.message);
  }
};
