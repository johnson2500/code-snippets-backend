import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import admin from './firebase/index';
import snippetRoutes from './routes/snippets';
import noteRoutes from './routes/notes';
import todoRoutes from './routes/todos';
import scratchPadRoutes from './routes/scratchPad';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  console.log(req.headers.authorization);
  res.send('Hello World!');
});

snippetRoutes(app, admin);
noteRoutes(app, admin);
noteRoutes(app, admin);
todoRoutes(app, admin);
scratchPadRoutes(app, admin);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
