/* eslint-disable import/no-unresolved */
import { userCollectionRef } from '../../../models/users';
import { appLogger } from '../../../helpers/logger';

export default async (req, res) => {
  try {
    const { body, ownerId } = req;
    const { userName } = body;
    appLogger({ message: 'Initializing User' });

    const userDocRef = userCollectionRef.doc(ownerId);

    const userDoc = await userDocRef.set({
      ownerId,
      userName,
      ...body,
    }, { merge: true });

    res.send(userDoc);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};
