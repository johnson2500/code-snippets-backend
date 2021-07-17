import { v4 as uuidv4 } from 'uuid';
import { isAuthorizedFor, getDataFromSnapshot, getUserId } from '../helpers/index';

export default (app, admin) => {
  const db = admin.firestore();

  const snippetsRef = db.collection('todo');

  app.post('/todo', async (req, res) => {
    try {
      console.log('Writing to todo');

      const {
        todo,
      } = req.body;

      console.log(req.body);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/snippets userId ', userId);

      const doc = await snippetsRef.add({
        userId,
        todo,
        checked: false,
        title,
        description,
      });

      console.log('/snippets created snippets', doc.id);
      console.log(doc);

      res.send(doc.id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.post('/todo', async (req, res) => {
    try {
      console.log('Writing to notes');

      const {
        pinned, id,
      } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/pins userId ', userId);

      const doc = await snippetsRef.doc(id).update({
        pinned,
      });

      console.log('/pins changed', doc.id);
      console.log(doc);

      res.send(doc.id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/todo', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await snippetsRef.where('userId', '==', userId).get();

      res.send(queryRef);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/todos', async (req, res) => {
    try {
      console.log('Request: /snippets');
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await snippetsRef.where('userId', '==', userId).get();

      const data = getDataFromSnapshot(queryRef);

      res.send(data);
    } catch (err) {
      console.log(`Error: /snippets : ${err.message}`);
      res.status(500).send(err.message);
    }
  });

  app.delete('/todo/:docId', async (req, res) => {
    try {
      const { docId } = req.params;

      console.log('Attempting to delete doc ', docId);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const document = await snippetsRef.doc(docId).get();

      const { userId: documentUserId } = document.data();

      if (documentUserId !== userId) {
        res.status(401).sent('Not Authorized to delete');
        return;
      }

      await db.collection('snippets').doc(docId).delete();

      res.send(docId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.put('/todo', async (req, res) => {
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

      await snippetsRef.doc(id).set({
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
