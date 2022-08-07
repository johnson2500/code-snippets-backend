import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import BaseModel from '../Base/base';
import { IAccount } from '../../types/accountTypes';

export default class Accounts extends BaseModel {
  ownerId: string;
  accountCollectionName: string;
  accountRef: FirebaseFirestore.CollectionReference;

  constructor(ownerId: string = null) {
    super();
    this.ownerId = ownerId;
    this.accountCollectionName = 'accounts';
    this.accountRef = getFirestore().collection(this.accountCollectionName);
  }

  getAccountRef(): FirebaseFirestore.DocumentReference {
    return this.accountRef.doc(this.ownerId);
  }

  async addAccount(data: Partial<IAccount>): Promise<FirebaseFirestore.WriteResult> {
    return this.accountRef.doc(this.ownerId).set(data);
  }

  async getAccount(): Promise<FirebaseFirestore.DocumentSnapshot<DocumentData>> {
    return this.getAccountRef().get();
  }

  async updateAccount(data: Partial<IAccount>): Promise<FirebaseFirestore.WriteResult> {
    return this.getAccountRef().update(data);
  }
}
