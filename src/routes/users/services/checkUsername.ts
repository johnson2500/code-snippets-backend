
import { userCollectionRef } from '../../../models/collectionRefs';
import { Request, Response} from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { query: { userName } } = req;
    const snapshot = await userCollectionRef.where('userName', '==', userName).get();

    res.send(snapshot.empty);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
