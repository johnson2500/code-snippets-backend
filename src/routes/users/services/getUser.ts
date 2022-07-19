import { userCollectionRef } from '../../../models/collectionRefs';
import { Request, Response} from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId } = req;

    const userDoc = await userCollectionRef.doc(ownerId).get();

    if (!userDoc.exists) {
      res.status(404).send({ message: `User ${ownerId} not found or you do not have permission.` });
      return;
    }

    res.send(userDoc.data());
  } catch (error: any) {
    console.log(error);
    const { message } = error;
    res.status(500).send({ message });
  }
};
