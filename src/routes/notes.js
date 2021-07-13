import { isAuthorizedFor, getDataFromSnapshot, getUserId } from '../helpers/index';

export default (app, admin) => {
  const db = admin.firestore();

  const notesRef = db.collection('notes');

  app.get('/note', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await notesRef.where('userId', '==', userId).get();

      res.send(queryRef);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/notes', async (req, res) => {
    try {
      console.log('Request: /notes');
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const queryRef = await notesRef.where('userId', '==', userId).get();

      const data = getDataFromSnapshot(queryRef);

      res.send(data);
    } catch (err) {
      console.log(`Error: /notes : ${err.message}`);
      res.status(500).send(err.message);
    }
  });

  app.post('/note', async (req, res) => {
    try {
      console.log('Writing to notes');

      const {
        text, title, description,
      } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/note userId ', userId);

      const doc = await notesRef.add({
        userId,
        text,
        title,
        description,
      });

      console.log('/notes created notes', doc.id);
      console.log(doc);

      res.send(doc.id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.post('/note/pin', async (req, res) => {
    try {
      console.log('Writing to notes');

      const {
        pinned, id,
      } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/note updating pinned variable ', userId);

      const doc = await notesRef.doc(id).update({
        pinned,
      });

      console.log('/notes created notes', doc.id);
      console.log(doc);

      res.send(doc.id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.put('/note', async (req, res) => {
    try {
      const { authorization: token } = req.headers;
      const {
        id, text, description, title,
      } = req.body;

      const userId = await getUserId(admin, token);

      const isAuthed = await isAuthorizedFor(admin, token, userId);

      if (!isAuthed) {
        res.status(401).send('Not Authorized for uuid');
        return;
      }

      await notesRef.doc(id).set({
        userId,
        text,
        title,
        description,
      });

      res.send(id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/note/:docId', async (req, res) => {
    try {
      const { docId } = req.params;

      console.log('Attempting to delete doc ', docId);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const document = await notesRef.doc(docId).get();

      const { userId: documentUserId } = document.data();

      if (documentUserId !== userId) {
        res.status(401).sent('Not Authorized to delete');
        return;
      }

      await db.collection('notes').doc(docId).delete();

      res.send(docId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
