/* eslint-disable import/no-unresolved */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import config from './config';

dotenv.config();

const admin = initializeApp({ credential: cert(config()) });

// set up firestore
getFirestore(admin);

export default admin;
