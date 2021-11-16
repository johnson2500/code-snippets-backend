import Users from '../../../models/users';

export default async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const user = await Users.query().findById(id);

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
