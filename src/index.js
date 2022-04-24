import './firebase/index';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as logger from 'npmlog';
import routes from './routes';
import loggerMiddleWare from './helpers/logger';
import authentication from './helpers/authentication';

const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loggerMiddleWare);
app.use(authentication);

app.get('/', (req, res) => { res.send(req.path); });

routes(app, logger);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
