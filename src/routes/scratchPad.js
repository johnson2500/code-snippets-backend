import { v4 as uuidv4 } from 'uuid';
import { isAuthorizedFor, getDataFromSnapshot, getUserId } from '../helpers/index';

export default (app, admin) => {
  const db = admin.firestore();

  const scratchPadRef = db.collection('scratchPads');

  app.post('/scratch-pad', async (req, res) => {
    try {
      console.log('Writing to scratch pads ');

      console.log('Writing to scratch pads ');

      console.log('Writing to scratch pads ');

      const { language, content } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/scratch-pads userId ', userId);

      const uniqueId = uuidv4();

      const doc = await scratchPadRef.add({
        userId,
        _id: uniqueId,
        checked: false,
        language,
        content,
        createdAt: new Date(),
        updateAt: null,
        archived: false,
      });

      console.log('/scratch-pads created todo', doc.id);

      res.send(doc.id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/scratch-pad', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await scratchPadRef.where('userId', '==', userId).get();

      const data = getDataFromSnapshot(queryRef);

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/scratch-pad/:docId', async (req, res) => {
    try {
      const { docId } = req.params;

      console.log('Attempting to delete doc ', docId);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const document = await scratchPadRef.doc(docId).get();

      const { userId: documentUserId } = document.data();

      if (documentUserId !== userId) {
        res.status(401).sent('Not Authorized to delete');
        return;
      }

      await db.collection('todo').doc(docId).delete();

      res.send(docId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.put('/scratch-pad', async (req, res) => {
    try {
      const { authorization: token } = req.headers;
      const {
        id, language, content,
      } = req.body;

      const userId = await getUserId(admin, token);

      const isAuthed = await isAuthorizedFor(admin, token, userId);

      if (!isAuthed) {
        res.status(401).send('Not Authorized for uuid');
        return;
      }

      await scratchPadRef.doc(id).set({
        userId,
        language,
        content,
      });

      res.send(id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });
};
