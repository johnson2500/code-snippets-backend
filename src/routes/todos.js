import { v4 as uuidv4 } from 'uuid';
import { isAuthorizedFor, getDataFromSnapshot, getUserId } from '../helpers/index';

export default (app, admin) => {
  const db = admin.firestore();

  const todoRef = db.collection('todo');

  app.post('/todo', async (req, res) => {
    try {
      console.log('Writing to todo');

      const {
        todo,
      } = req.body;

      const { authorization: token } = req.headers;

      console.log(token);

      const userId = await getUserId(admin, token);

      console.log('/todos userId ', userId);

      const uniqueId = uuidv4();

      const doc = await todoRef.add({
        userId,
        _id: uniqueId,
        checked: false,
        todo,
        createdAt: new Date(),
        updateAt: null,
        archived: false,
      });

      console.log('/todos created todo', doc.id);

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
      const queryRef = await todoRef.where('userId', '==', userId).get();

      res.send(queryRef);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/todos', async (req, res) => {
    try {
      console.log('Request: /todos');

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await todoRef.where('userId', '==', userId).get();

      const data = getDataFromSnapshot(queryRef);

      res.send(data);
    } catch (err) {
      console.log(`Error: /todos : ${err.message}`);
      res.status(500).send(err.message);
    }
  });

  app.delete('/todo/:docId', async (req, res) => {
    try {
      const { docId } = req.params;

      console.log('Attempting to delete doc ', docId);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const document = await todoRef.doc(docId).get();

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

      await todoRef.doc(id).set({
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
