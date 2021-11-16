import Users from '../../../models/users';
import Tasks from '../../../models/tasks';

export default async (req, res) => {
  try {
    const { body, ownerId } = req;
    const { userName } = body;

    const [userNameExists] = await Users.query().where({ user_name: userName });

    if (userNameExists) {
      res.status(400).send('Username already Exists. ');
    }

    const user = await Users.query().insert({
      ...body,
      ownerId,
    });

    Tasks.query().insertGraph({
      name: 'Task Group',
      id: user.id,
    });

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
