// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import BaseModel from './base';

export default class Todos extends BaseModel {
  constructor() {
    super();
    this.projectCollectionName = 'projects';
    this.baseCollectionName = 'todoLists';
    this.listsCollectionName = 'lists';
    this.itemsCollectionName = 'items';
    this.baseRef = getFirestore().collection(this.baseCollectionName);
  }

  getUserListRef(ownerId) {
    return this.baseRef.doc(ownerId);
  }

  getTodoListsRef(ownerId) {
    return this.getUserListRef(ownerId).collection(this.listsCollectionName);
  }

  async addTodoList(ownerId, data) {
    const listRef = this.getUserListRef(ownerId);

    return listRef.collection(this.listsCollectionName).add(data);
  }

  async getTodoList(ownerId, todoListCollectionId) {
    return this.getTodoListsRef(ownerId).doc(todoListCollectionId).get();
  }

  async addTodoListItem(ownerId, todoListCollectionId, data) {
    return this.getTodoListsRef(ownerId)
      .doc(todoListCollectionId)
      .collection(this.itemsCollectionName)
      .add(data);
  }

  async getTodoListItem(ownerId, todoListCollectionId, todoListItemId) {
    return this.getTodoListsRef(ownerId)
      .doc(todoListCollectionId)
      .collection(this.itemsCollectionName)
      .doc(todoListItemId)
      .get();
  }

  async getTodoListItems(ownerId, todoListCollectionId) {
    return this.getTodoListsRef(ownerId)
      .doc(todoListCollectionId)
      .collection(this.itemsCollectionName)
      .get();
  }
}
