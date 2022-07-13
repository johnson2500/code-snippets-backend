// eslint-disable-next-line import/no-unresolved
/* eslint-disable import/no-unresolved */
import { getFirestore } from 'firebase-admin/firestore';

export default (app) => {
  app.get(
    '/test',
    async (req, res) => {
      const userCollectionRef = getFirestore().collectionGroup('todoLists');
      const data = await userCollectionRef.get();

      const rest = [];
      data.forEach((doc) => {
        console.log(doc);
        rest.push({ id: doc.id, data: doc.data(), child: doc.child });
      });
      console.log(data.id);

      res.send(JSON.stringify(rest));
    },
  );
};
