import { appLogger } from '../../../helpers/logger';
import TaskGroup from '../../../models/taskGroups';
import Users from '../../../models/users';

export default async (req, res) => {
  try {
    const { ownerId, params: { taskGroupId } } = req;

    appLogger(`Getting tasks for ${ownerId}`);

    const { id: userId } = await Users.query().findOne({
      owner_id: ownerId,
    });

    if (!userId) {
      throw Error(`No user found for ${ownerId} when creating task.`);
    }

    const tasks = await TaskGroup.query().where({
      user_id: userId,
      id: taskGroupId,
    }).withGraphFetched({
      tasks: true,
    });

    appLogger({ message: `Getting tasks for ${ownerId}`, data: tasks });

    res.send(tasks);
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
