import express, { Request} from 'express'
import TaskItems from '@server/models/TaskItems/taskItems';

export default async (req: Request, res: express.Response): Promise<void> => {
  const { ownerId, body } = req;
  const { projectId } = body;

  const taskItems: TaskItems = new TaskItems(ownerId);

  const data = await taskItems.addTaskItem(projectId, { title: body.title });

  res.send(data);
};
