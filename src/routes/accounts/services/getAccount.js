import Account from '../../../models/accounts';
import reponseTransformer from '../../../helpers/reponseTransformer';

const project = new Account();

export default async (req, res) => {
  const { ownerId } = req;

  const accountSnapshot = await project.getAccount(ownerId);
  const responseData = {
    account: {
      id: ownerId,
      ...accountSnapshot.data(),
    },
  };

  res.send(reponseTransformer(req, responseData));
};
