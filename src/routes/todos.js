import { TODO_TABLE_NAME } from '../helpers/snippetHelpers';
import { getUserId } from '../helpers/index';

export default (app, admin, pg) => {
  app.post('/todo', async (req, res) => {
    try {
      console.log('Writing to todo');

      const { content } = req.body;

      console.log(req.body);

      const { authorization: token } = req.headers;

      const ownerId = await getUserId(admin, token);

      console.log('/todos userId ', ownerId);

      const id = await pg.executeQuery({
        // give the query a unique name
        name: 'post-todo',
        text: `INSERT INTO ${TODO_TABLE_NAME} 
          (content,owner_id,archived,created_at)
          VALUES
          ($1, $2, $3, $4) RETURNING *
          `,
        values: [content, ownerId, false, 'NOW()'],
      });

      console.log('/todo created todos', id[0]);

      res.send(id[0]);
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
      const todos = await pg.executeQuery({
        // give the query a unique name
        name: 'get-todos',
        text: `
          SELECT
            *
          FROM ${TODO_TABLE_NAME}
          WHERE
            owner_id=$1;`,
        values: [userId],
      });

      res.send(todos);
    } catch (err) {
      console.log(`Error: /todos : ${err.message}`);
      res.status(500).send(err.message);
    }
  });

  app.delete('/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;

      console.log('Attempting to delete doc ', id);

      const { authorization: token } = req.headers;

      const ownerId = await getUserId(admin, token);

      const results = await pg.executeQuery({
        // give the query a unique name
        name: 'delete-todo',
        text: `
          DELETE FROM ${TODO_TABLE_NAME} 
          WHERE
            id=$1
            AND owner_id=$2
          RETURNING id;
        `,
        values: [id, ownerId],
      });

      if (results && results.length > 0) {
        res.send(results[0]);
        return;
      }

      res.status(401);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
