import Todos from '../../../models/TodoLists/todoLists';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { logger } from '@server/config/logger';
import { Response, Request } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId, body: { name }, params: { projectId } } = req;
    const todos = new Todos(ownerId, projectId);

    const data = await todos.addTodoList({ name, ownerId });

    res.send(reponseTransformer(req, { id: data.id }));
  } catch (error) {
    logger.info(error);
    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};
