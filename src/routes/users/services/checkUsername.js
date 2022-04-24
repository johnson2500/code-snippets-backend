import { userCollectionRef } from '../../../models/users';

export default async (req, res) => {
  try {
    const { query: { userName } } = req;
    const snapshot = await userCollectionRef.where('userName', '==', userName).get();

    res.send(snapshot.empty);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
