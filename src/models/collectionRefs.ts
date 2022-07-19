import { getFirestore } from 'firebase-admin/firestore';

export const USERS_TABLE_NAME = 'users';
export const TODO_LISTS = 'todoLists';
export const PROJECTS = 'project';

export const userCollectionRef: FirebaseFirestore.CollectionReference = getFirestore().collection(USERS_TABLE_NAME);
export const todoListsCollectionRef: FirebaseFirestore.CollectionReference  = getFirestore().collection(TODO_LISTS);
export const projectCollectionRef: FirebaseFirestore.CollectionReference  = getFirestore().collection(PROJECTS);
