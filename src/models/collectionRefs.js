// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';

export const USERS_TABLE_NAME = 'users';
export const TODO_LISTS = 'todoLists';
export const PROJECTS = 'project';

export const userCollectionRef = getFirestore().collection(USERS_TABLE_NAME);
export const todoListsCollectionRef = getFirestore().collection(TODO_LISTS);
export const projectCollectionRef = getFirestore().collection(PROJECTS);
