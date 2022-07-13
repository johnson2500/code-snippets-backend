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

  getAccountRef() {
    return this.accountRef.doc(this.ownerId);
  }

  async addAccount(data) {
    return this.accountRef.doc(this.ownerId).set(data);
  }

  async getAccount() {
    return this.getAccountRef(this.ownerId).get();
  }

  async updateAccount(data) {
    return this.getAccountRef(this.ownerId).update(data);
  }
}
