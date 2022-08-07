import Projects from '../Projects/projectRef';
import { IProject, ITaskItem } from '@server/types/projectTypes';
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

  constructor(ownerId: string = null,projectId: string = null, ) {
    super(ownerId, projectId);
  }

  async updateComplete(taskId: string, completed: boolean): Promise<ITaskItem[]> {
    // THIS IS BAD FIX THIS
    const taskItems: ITaskItem[] = await this.getTaskItems()

    const parsedTaskItems:ITaskItem[] = taskItems.map((task) => {
      if(taskId === task.id) {
        return {
          ...task,
          completed,
        }
      }

      return task
    })

    this.getProjectRef().doc(this.projectId).update({
      "taskList.taskItems": parsedTaskItems,
    });

    return parsedTaskItems
  }

  async getTaskItems(): Promise<ITaskItem[]> {
    const project: IProject = <IProject><unknown>(await this.getProjectRef().doc(this.projectId).get()).data();
    console.log(project)

    const { taskList: { taskItems }} = project;

    return taskItems
  }

  async addTaskItem(data: ICreateTaskItem): Promise<{ id: string}> {
    const rightNow: Moment = moment.utc()

    const id =  uuidv4()
    const createdData: ITaskItem = {
      id,
      title: data.title,
      timestamps:{
          createdAt: rightNow,
          updatedAt: rightNow
      }
    }
    this.getProjectRef().doc(this.projectId).update({
      "taskList.taskItems": FieldValue.arrayUnion(createdData)
    });
    return {id}
  }

}
