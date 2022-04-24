// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';

export const USERS_TABLE_NAME = 'users';

export const userCollectionRef = getFirestore().collection(USERS_TABLE_NAME);
