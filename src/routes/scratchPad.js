import { SNIPPET_TABLE_NAME, SNIPPET_TYPES, getUpdateSnippetQuery } from '../helpers/snippetHelpers';
import { isAuthorizedFor, getUserId } from '../helpers/index';

export default (app, admin, pg) => {
  app.post('/scratch-pad', async (req, res) => {
    try {
      console.log('Writing to scratch pads ');

      const { language, content } = req.body;

      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      console.log('/scratch-pads userId ', userId);

      const id = await pg.executeQuery({
        // give the query a unique name
        name: 'post-scratchpad',
        text: `INSERT INTO ${SNIPPET_TABLE_NAME} 
          (title, content, language, snippet_type_id, owner_id, archived, created_at)
          VALUES
          ($1, $2, $3, $4, $5, $6, $7) RETURNING id
          `,
        values: [content, language, SNIPPET_TYPES.scratchPad, userId, false, 'NOW()'],
      });

      console.log('/scratch-pads created todo', id);

      res.send(id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get('/scratch-pad', async (req, res) => {
    try {
      const { authorization: token } = req.headers;

      const userId = await getUserId(admin, token);

      const snippets = await pg.executeQuery({
        // give the query a unique name
        name: 'get-scratchpad',
        text: `
          SELECT
            *
          FROM ${SNIPPET_TABLE_NAME}
          WHERE
            owner_id=$1
            and snippet_type_id=$2
        `,
        values: [userId, SNIPPET_TYPES.scratchPad],
      });

      console.log(snippets);

      res.send(snippets);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.put('/scratch-pad', async (req, res) => {
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
        name: 'update-scratchpad',
        text: `
          UPDATE ${SNIPPET_TABLE_NAME}
          SET
            ${sql} 
          WHERE
          owner_id='${ownerId}'
          AND id=${id}
          AND snippet_type_id=${SNIPPET_TYPES.scratchPad}
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
