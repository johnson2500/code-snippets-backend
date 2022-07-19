import { userCollectionRef } from '../../../models/collectionRefs';
import { Request, Response} from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { body, ownerId } = req;
    const id = await userCollectionRef.doc(ownerId).set({
      ...body,
      ownerId,
    }, { merge: true });

    res.send(id);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
