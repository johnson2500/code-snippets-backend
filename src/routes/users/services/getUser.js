import { userCollectionRef } from '../../../models/users';

export default async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const userDoc = await userCollectionRef.doc(id).get();

    if (!userDoc.exists) {
      res.status(404).send({ message: `User ${id} not found or you do not have permission.` });
      return;
    }

    res.send(userDoc.data());
  } catch (error) {
    console.log(error);
    const { message } = error;
    res.status(500).send({ message });
  }
};
