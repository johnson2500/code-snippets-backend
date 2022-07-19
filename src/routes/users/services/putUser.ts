import {logger} from '@config/logger'
import { Request, Response} from 'express';
import { Users } from '@server/models';
import reponseTransformer from '@server/helpers/reponseTransformer';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { body, ownerId } = req;
    const user: Users = new Users(ownerId);

    logger.info({ message: 'Initializing User' });

    const userWriteResult: FirebaseFirestore.WriteResult = await user.addUser(body)

    res.send(reponseTransformer(req, {...body, userWriteResult }));
  } catch (error: any) {
    logger.error(error);

    res.status(500).send(error.message);
  }
};
