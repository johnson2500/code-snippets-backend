import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import config from './config';

const admin = initializeApp({ credential: cert(config()) });

// set up firestore
getFirestore(admin);

export default admin;
