import { Users } from '@server/models';
import reponseTransformer from '@server/helpers/reponseTransformer';
import { Request, Response} from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId } = req;

    const users: Users = new Users(ownerId)

    const user = await users.getUser()

    if (!user.exists) {
      res.status(404).send({ message: `User ${ownerId} not found or you do not have permission.` });
      return;
    }

    res.send(reponseTransformer(req, user.data()));
  } catch (error: any) {
    console.log(error);
    const { message } = error;
    res.status(500).send({ message });
  }
};
