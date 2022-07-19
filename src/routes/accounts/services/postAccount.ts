import Account from '../../../models/accountModel';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { Request, Response} from 'express'

export default async (req: Request, res: Response): Promise<void> => {
  const { ownerId, body } = req;

  const account: Account = new Account(ownerId);

  await account.addAccount(body);

  res.send(reponseTransformer(req, { ...body, id: ownerId }));
};
