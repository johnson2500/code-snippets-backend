import Projects from '../Projects/projectRef';
import { ITaskItem } from '@server/types/projectTypes';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import moment, {Moment} from 'moment'

export interface ICreateTaskItem {
  title: string;
}

export default class TaskItems extends Projects {
  ownerId: string;
  accountCollectionName: string;
  accountRef: FirebaseFirestore.CollectionReference;

  constructor(ownerId: string = null) {
    super(ownerId);
  }

  async addTaskItem(projectId: string, data: ICreateTaskItem): Promise<FirebaseFirestore.WriteResult> {
    const rightNow: Moment = moment.utc()

    const createdData: ITaskItem = {
      id: uuidv4(),
      title: data.title,
      timestamps:{
          createdAt: rightNow,
          updatedAt: rightNow
      }
    }
    return this.getProjectRef().doc(projectId).update({
      "taskList.taskItems": FieldValue.arrayUnion(createdData)
    });
  }

}
