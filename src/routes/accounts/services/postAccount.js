import Account from '../../../models/accounts';
import reponseTransformer from '../../../helpers/reponseTransformer';

const account = new Account();

export default async (req, res) => {
  const { ownerId, body } = req;

  await account.addAccount(ownerId, body);

  res.send(reponseTransformer(req, { ...body, id: ownerId }));
};
