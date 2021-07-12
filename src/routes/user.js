import { isAuthorizedFor, getUserId } from '../helpers/index';

export default (app, admin) => {
  const db = admin.firestore();

  const usersRef = db.collection('users');

  app.post('/user', async (req, res) => {
    try {
      console.log('Writing to users');

      const {
        language, code, title, description,
      } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/users userId ', userId);

      const doc = await usersRef.add({
        userId,
        language,
        code,
        title,
        description,
      });

      console.log('/users created users', doc.id);
      console.log(doc);

      res.send(doc.id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/user', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await usersRef.where('userId', '==', userId).get();

      res.send(queryRef);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/user/:docId', async (req, res) => {
    try {
      const { docId } = req.params;

      console.log('Attempting to delete doc ', docId);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const document = await usersRef.doc(docId).get();

      const { userId: documentUserId } = document.data();

      if (documentUserId !== userId) {
        res.status(401).sent('Not Authorized to delete');
        return;
      }

      await db.collection('users').doc(docId).delete();

      res.send(docId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.put('/user', async (req, res) => {
    try {
      const { authorization: token } = req.headers;
      const {
        id, language, code, description, title,
      } = req.body;

      const userId = await getUserId(admin, token);

      const isAuthed = await isAuthorizedFor(admin, token, userId);

      if (!isAuthed) {
        res.status(401).send('Not Authorized for uuid');
        return;
      }

      await usersRef.doc(id).set({
        userId,
        language,
        code,
        title,
        description,
      });

      res.send(id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });
};
