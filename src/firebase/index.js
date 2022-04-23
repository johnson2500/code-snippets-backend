// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import config from './config';

dotenv.config();

const serviceAccount = config();

const admin = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://code-snippets-a906c-default-rtdb.firebaseio.com',
});

// Get a database reference to our posts
const db = getFirestore(admin);
const ref = db.collection('users').doc();
// ref.set({});

const test = ref.set({
  poop: 'poops',
  test: 2,
});

console.log(test);

export default admin;
