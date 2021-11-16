import Users from '../../../models/users';

export default async (req, res) => {
  try {
    const { query: { userName } } = req;
    const [userNameExists] = await Users.query().where({ user_name: userName });
    console.log('username exists', !!userNameExists);
    res.send(!!userNameExists);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
