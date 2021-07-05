import { isAuthorizedFor, getDataFromSnapshot } from '../helpers/index';

export default (app, admin) => {
  app.post('/snippet', async (req, res) => {
    const {
      userId, language, code, title,
    } = req.body;

    if (!userId || !language || !code) {
      res.status(400).send('uuid, language and code are required!');
      return;
    }
    try {
      console.log(`Writing to snippets ${req.body}`);

      const db = admin.firestore();

      await db.collection('snippets').doc().set({
        userId,
        language,
        code,
        title,
      });
      res.send('Sucess');
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/snippet', async (req, res) => {
    const { userId, token } = req.query;

    const isAuthed = await isAuthorizedFor(admin, token, userId);

    if (!isAuthed) {
      res.code(401).send('Not Authorized for uuid');
    }

    const db = admin.firestore();

    // Create a reference to the cities collection
    const snippetsRef = db.collection('snippets');

    // Create a query against the collection
    const queryRef = await snippetsRef.where('userId', '==', userId).get();

    res.send(queryRef);
  });

  app.get('/snippets', async (req, res) => {
    const { userId, token } = req.query;

    const isAuthed = await isAuthorizedFor(admin, token, userId);

    if (!isAuthed) {
      res.status(401).send('Not Authorized for uuid');
      return;
    }

    const db = admin.firestore();

    // Create a reference to the cities collection
    const snippetsRef = db.collection('snippets');

    // Create a query against the collection
    const queryRef = await snippetsRef.where('userId', '==', userId).get();

    res.send(getDataFromSnapshot(queryRef));
  });

  app.delete('/snippet', async (req, res) => {
    const { userId, token, id } = req.query;

    const isAuthed = await isAuthorizedFor(admin, token, userId);

    if (!isAuthed) {
      res.status(401).send('Not Authorized for uuid');
      return;
    }

    const db = admin.firestore();
    // delete document
    db.collection('snippets').doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
      res.send(`Deleted ${id}`);
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
        res.status(500).send(error);
      });
  });
};
