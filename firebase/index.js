import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import config from './config';

dotenv.config();

const serviceAccount = config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://code-snippets-a906c-default-rtdb.firebaseio.com',
});

export default admin;
