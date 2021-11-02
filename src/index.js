import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import admin from './firebase/index';
import snippetRoutes from './routes/snippets';
import noteRoutes from './routes/notes';
import todoRoutes from './routes/todos';
import scratchPadRoutes from './routes/scratchPad';
import PostgresHelper from './postgres/postgresHelper';
import usersRoutes from './routes/user';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

const pg = new PostgresHelper(process.env.POSTGRES_URI);

pg.connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

snippetRoutes(app, admin, pg);
noteRoutes(app, admin, pg);
todoRoutes(app, admin, pg);
scratchPadRoutes(app, admin, pg);
usersRoutes(app, admin, pg);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
