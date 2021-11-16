import Users from '../../../models/users';

export default async (req, res) => {
  try {
    const id = await Users.query().withGraphFetched().limit(10).offset();

    res.send(id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
