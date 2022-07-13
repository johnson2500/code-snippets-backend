// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import BaseModel from './base';

export default class Account extends BaseModel {
  constructor(ownerId) {
    super();
    this.ownerId = ownerId;
    this.accountCollectionName = 'accounts';
    this.accountRef = getFirestore().collection(this.accountCollectionName);
  }

  getAccountRef(ownerId) {
    return this.accountRef.doc(ownerId);
  }

  async addAccount(ownerId, data) {
    return this.accountRef.doc(ownerId).set(data);
  }

  async getAccount(ownerId) {
    return this.getAccountRef(ownerId).get();
  }

  async updateAccount(ownerId, data) {
    return this.getAccountRef(ownerId).update(data);
  }
}
