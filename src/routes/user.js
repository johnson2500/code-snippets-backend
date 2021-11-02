import { isAuthorizedFor, getUserId } from '../helpers/index';
import { USERS_TABLE_NAME } from '../helpers/snippetHelpers';

export default (app, admin, pg) => {
  const db = admin.firestore();

  const usersRef = db.collection('users');

  app.post('/users/is-available', async (req, res) => {
    try {
      console.log('Writing to users');

      const { userName } = req.body;
      console.log(userName);

      const userNameExists = await pg.executeQuery({
        // give the query a unique name
        name: 'post-check-username',
        text: `SELECT EXISTS (
            SELECT
              *
            FROM ${USERS_TABLE_NAME} WHERE user_name = $1
          )
        `,
        values: [userName],
      });

      console.log('username Exists', userNameExists);

      res.send(userNameExists[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.post('/user', async (req, res) => {
    try {
      console.log('Writing to users');

      const {
        userName, email, ownerId,
      } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/user userId ', userId);

      const newUser = await pg.executeQuery({
        // give the query a unique name
        name: 'post-new-user',
        text: `INSERT INTO ${USERS_TABLE_NAME} 
          (user_name,owner_id,email,created_at)
          VALUES
          ($1, $2, $3, $4) RETURNING *
          `,
        values: [userName, email, ownerId, 'NOW()'],
      });

      console.log('/user created user', newUser[0]);

      res.send({
        userName: newUser[0].user_name,
        ownerId: newUser[0].owner_id,
        email: newUser[0].owner_id,
        createdAt: newUser[0].created_at,
        deletedAt: newUser[0].deleted_at,
        updatedAt: newUser[0].updated_at,
      });
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
