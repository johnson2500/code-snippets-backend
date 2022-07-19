import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import BaseModel from '../Base/base';
import { IUser } from './userTypes';

export default class Users extends BaseModel {
  ownerId: string;
  usersCollectionName: string;
  usersRef: FirebaseFirestore.CollectionReference

  constructor(ownerId: string = null) {
    super();
    this.ownerId = ownerId;
    this.usersCollectionName = 'users';
    this.usersRef = getFirestore().collection(this.usersCollectionName);
  }

  getUserRef(): FirebaseFirestore.DocumentReference {
    return this.usersRef.doc(this.ownerId);
  }

  async addUser(data: Partial<IUser>): Promise<FirebaseFirestore.WriteResult> {
    return this.usersRef.doc(this.ownerId).set(data);
  }

  async getUser(): Promise<FirebaseFirestore.DocumentSnapshot<DocumentData>> {
    return this.getUserRef().get();
  }

  async updateUser(data: Partial<IUser>): Promise<FirebaseFirestore.WriteResult> {
    return this.getUserRef().update(data);
  }
}
