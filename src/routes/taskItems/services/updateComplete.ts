import express, { Request} from 'express'
import TaskItems from '@server/models/TaskItems/taskItems';

export default async (req: Request, res: express.Response): Promise<void> => {
  const { ownerId, body } = req;
  const { projectId, taskId, completed} = body;

  const taskItems: TaskItems = new TaskItems(ownerId, projectId);

  const tasks = await taskItems.updateComplete(taskId, completed)

  res.send({ tasks });
};
