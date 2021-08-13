import { isAuthorizedFor, getUserId } from '../helpers/index';
import { getUpdateSnippetQuery, SNIPPET_TYPES, SNIPPET_TABLE_NAME } from '../helpers/snippetHelpers';

export default (app, admin, pg) => {
  app.post('/snippet', async (req, res) => {
    try {
      console.log('Writing to snippets');

      const {
        language, content, title,
      } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/snippets userId ', userId);

      const id = await pg.executeQuery({
        // give the query a unique name
        name: 'post-code-snippet',
        text: `INSERT INTO ${SNIPPET_TABLE_NAME} 
          (title, content, language, snippet_type_id, owner_id, archived, created_at)
          VALUES
          ($1, $2, $3, $4, $5, $6, $7) RETURNING id
          `,
        values: [title, content, language, SNIPPET_TYPES.snippet, userId, false, 'NOW()'],
      });

      console.log('/snippets created snippets', id[0]);

      res.send(id[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/snippet/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const snippets = await pg.executeQuery({
        // give the query a unique name
        name: 'post-code-snippet',
        text: `SELECT * FROM  ${SNIPPET_TABLE_NAME} WHERE id=$1 and owner_id=$2`,
        values: [id, userId],
      });

      res.send(snippets);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/snippets', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const snippets = await pg.executeQuery({
        // give the query a unique name
        name: 'get-code-snippets',
        text: `SELECT * FROM snippets WHERE owner_id=$1 AND snippet_type_id=${SNIPPET_TYPES.snippet} ;`,
        values: [userId],
      });

      res.send(snippets);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/snippet/:id', async (req, res) => {
    try {
      const { id } = req.params;

      console.log('Attempting to delete doc ', id);

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const results = await pg.executeQuery({
        // give the query a unique name
        name: 'post-code-snippet',
        text: `
          DELETE FROM ${SNIPPET_TABLE_NAME} WHERE id=$1 AND owner_id=$2 AND snippet_type_id=${SNIPPET_TYPES.snippet} returning id;
        `,
        values: [id, userId],
      });

      if (results && results.length > 0) {
        res.send(results);
        return;
      }

      res.status(401);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.put('/snippet', async (req, res) => {
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
          AND snippet_type_id=${SNIPPET_TYPES.snippet}
          RETURNING id;
        `,
        values,
      })[0];

      console.log('Updateing snippet: ', queriedId);

      res.send(queriedId);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });
};
