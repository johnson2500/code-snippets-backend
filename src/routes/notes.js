import { isAuthorizedFor, getUserId } from '../helpers/index';
import { SNIPPET_TYPES, SNIPPET_TABLE_NAME, getUpdateSnippetQuery } from '../helpers/snippetHelpers';

export default (app, admin, pg) => {
  app.post('/note', async (req, res) => {
    try {
      console.log('creating new note');

      const { content, title, pinned = false } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/note userId ', userId);

      const note = await pg.executeQuery({
        // give the query a unique name
        name: 'post-note',
        text: `INSERT INTO snippets 
          (title, content, snippet_type_id, owner_id, pinned, archived, created_at)
          VALUES
          ($1, $2, $3, $4, $5, $6, $7) RETURNING *
          `,
        values: [title, content, SNIPPET_TYPES.note, userId, pinned, false, 'NOW()'],
      });

      console.log('/note created note', note);

      res.send(note[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/note/:id', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const { id } = req.params;

      const userId = await getUserId(admin, token);

      // Create a query against the collection
      const note = await pg.executeQuery({
        // give the query a unique name
        name: 'get-code-note-by-id',
        text: `
          SELECT
            *
          FROM snippets
          WHERE
          owner_id=$1
          AND snippet_type_id=$2
          AND id=$3;
        `,
        values: [
          userId,
          SNIPPET_TYPES.note,
          id,
        ],
      });

      res.send(note);
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
      const notes = await pg.executeQuery({
        // give the query a unique name
        name: 'get-notes',
        text: `
          SELECT
            *
          FROM snippets
          WHERE
          owner_id=$1
          AND snippet_type_id=$2;
        `,
        values: [
          userId,
          SNIPPET_TYPES.note,
        ],
      });

      res.send(notes);
    } catch (err) {
      console.log(`Error: /notes : ${err.message}`);
      res.status(500).send(err.message);
    }
  });

  app.post('/note/pin', async (req, res) => {
    try {
      console.log('Writing to notes');

      const {
        pinned, id,
      } = req.body;

      const { authorization: token } = req.headers;

      const ownerId = await getUserId(admin, token);

      console.log('/note userId ', ownerId);

      const { id: queriedId } = await pg.executeQuery({
        // give the query a unique name
        name: 'update-code-snippet',
        text: `
          UPDATE ${SNIPPET_TABLE_NAME}
          SET
            pinned=$1
          WHERE
          owner_id='${ownerId}'
          AND id=${id}
          AND snippet_type_id=${SNIPPET_TYPES.note}
          RETURNING id;
        `,
        values: [pinned],
      })[0];

      console.log('/notes created notes', queriedId);
      console.log(queriedId);

      res.send(queriedId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.put('/note', async (req, res) => {
    try {
      const { authorization: token } = req.headers;
      const { body } = req;
      const { id } = body;

      const ownerId = await getUserId(admin, token);

      const isAuthed = await isAuthorizedFor(admin, token, ownerId);

      if (!isAuthed) {
        res.status(401).send('Not Authorized for uuid');
        return;
      }

      const { values, sql } = getUpdateSnippetQuery(body);

      const { id: queriedId } = await pg.executeQuery({
        // give the query a unique name
        name: 'update-code-snippet',
        text: `
          UPDATE ${SNIPPET_TABLE_NAME}
          SET
            ${sql} 
          WHERE
          owner_id='${ownerId}'
          AND id=${id}
          AND snippet_type_id=${SNIPPET_TYPES.note}
          RETURNING id;
        `,
        values,
      })[0];

      console.log('Updateing note: ', queriedId);

      res.send(queriedId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/note/:id', async (req, res) => {
    try {
      const { id } = req.params;

      console.log('Attempting to delete note ', id);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const results = await pg.executeQuery({
        // give the query a unique name
        name: 'delete-note',
        text: `
          DELETE FROM ${SNIPPET_TABLE_NAME} 
          WHERE
            id=$1
            AND owner_id=$2
            AND snippet_type_id=${SNIPPET_TYPES.note}
          RETURNING id;
        `,
        values: [id, userId],
      });

      res.send(results[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
