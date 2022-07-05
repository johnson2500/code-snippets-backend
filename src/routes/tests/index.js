// eslint-disable-next-line import/no-unresolved
/* eslint-disable import/no-unresolved */
import { todoListsCollectionRef } from '../../models/collectionRefs';

export default (app) => {
  app.get(
    '/test',
    async (req, res) => {
      const { ownerId } = req;
      const snapshot = await todoListsCollectionRef.doc(ownerId).collection('lists').add({ name: 'First Todo' });

      console.log(snapshot.id);

      res.send(JSON.stringify(snapshot));
    },
  );
};
