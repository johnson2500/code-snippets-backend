import Accounts from '../../../models/Accounts/accounts';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { Request, Response} from 'express'


export default async (req: Request, res: Response): Promise<void> => {
  const { ownerId } = req;
  
  const project: Accounts = new Accounts(ownerId);
  const accountSnapshot:FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = await project.getAccount();
  const responseData = {
    account: {
      id: ownerId,
      ...accountSnapshot.data(),
    },
  };

  res.send(reponseTransformer(req, responseData));
};
