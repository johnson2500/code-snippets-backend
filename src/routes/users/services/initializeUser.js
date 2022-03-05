import Users from '../../../models/users';
import TaskGroup from '../../../models/taskGroups';
import { appLogger } from '../../../helpers/logger';

export default async (req, res) => {
  try {
    const { body, ownerId } = req;
    const { userName } = body;
    appLogger({ message: 'Initializing User' });

    const [userNameExists] = await Users.query().where({ user_name: userName });

    if (userNameExists) {
      res.status(400).send('Username already Exists. ');
      return;
    }

    const user = await Users.query().insert({
      ...body,
      ownerId,
    });

    console.log(user);

    appLogger({ message: 'Initializing User: User', data: user });

    if (user || user.id) {
      res.status(500).send('User Not Created!');
      return;
    }

    const [taskGroup] = await TaskGroup.query().insertGraph({
      name: 'Task Group',
      userId: user.id,
    });

    appLogger({ message: 'Initializing User: User', data: taskGroup });

    // const { id: taskGroupId } = taskGroup;

    // if (!taskGroupId) {
    //   res.status(500).send('Task Group Not Created!');
    //   return;
    // }

    res.send(taskGroup);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};
