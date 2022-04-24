// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';

export const USERS_TABLE_NAME = 'users';

export const dbRef = getFirestore().collection(USERS_TABLE_NAME);
