import { userCollectionRef } from '../../../models/collectionRefs';
import { appLogger } from '../../../helpers/logger';
import { Request, Response} from 'express';

export default async (req: Request, res: Response): Promise<void> => {
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
  } catch (error: any) {
    console.log(error);

    res.status(500).send(error.message);
  }
};
