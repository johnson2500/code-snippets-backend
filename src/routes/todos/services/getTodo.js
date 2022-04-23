import TaskGroup from '../../../models/taskGroups';
import { appLogger } from '../../../helpers/logger';

export default async (req, res) => {
  try {
    const { ownerId, params: { taskId } } = req;
    appLogger(`Getting task for ${ownerId}`);

    const task = await TaskGroup.query()
      .where({ ownerId, id: taskId })
      .withGraphFetched({ tasks: true });

    appLogger({ message: 'Created Task', data: task });
    res.send(task);
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
