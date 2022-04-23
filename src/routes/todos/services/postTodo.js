import Tasks from '../../../models/tasks';
import Users from '../../../models/users';
import { appLogger } from '../../../helpers/logger';

export default async (req, res) => {
  try {
    const { ownerId, body: { title, taskGroupId } } = req;

    appLogger(`Creating task for ${ownerId}, taskGroupId: ${taskGroupId}`);

    const { id: userId } = await Users.query().findOne({
      owner_id: ownerId,
    });

    if (!userId) {
      throw Error(`No user found for ${ownerId} when creating task.`);
    }

    const task = await Tasks.query().insert({
      title,
      userId,
      taskGroupId,
    });

    appLogger({ message: 'Created Task', data: task });

    res.send(task);
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
