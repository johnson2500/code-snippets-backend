import { todoListsCollectionRef } from '../../../models/collectionRefs';

export default async (req, res) => {
  const data = await todoListsCollectionRef.doc(req.ownerId).collection('list').add({ big: 'big' });
  res.send(data);
};
