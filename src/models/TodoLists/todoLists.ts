import Projects from '../Projects/projects';
import { ITodoList } from './todoListTypes';

export default class TodoLists extends Projects {
  ownerId: string;
  todoListId: string;
  listsCollectionName: string;

  constructor(ownerId: string, projectId: string, todoListId: string = null) {
    super(ownerId, projectId);
    this.todoListId = todoListId;
    this.listsCollectionName = 'todoLists';
  }

  getTodoListRef(): FirebaseFirestore.CollectionReference {
    return this.getFullProjectRef().collection(this.listsCollectionName);
  }

  getFullTodoListRef(): FirebaseFirestore.DocumentReference {
    return this.getFullProjectRef().collection(this.listsCollectionName).doc(this.todoListId);
  }

  async addTodoList(data: ITodoList): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>  {
    return this.getTodoListRef().add(data);
  }

  async getTodoList(id: string): Promise<FirebaseFirestore.DocumentData> {
    return this.getTodoListRef().doc(id).get();
  }

  async getTodoLists(): Promise<ITodoList[]> {
    const todoListsSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await this.getTodoListRef().get();

    const todoLists = [];
    todoListsSnapshot.forEach((todoListObj: FirebaseFirestore.DocumentData) => {
      const currentTodoList: ITodoList = {
        id: todoListObj.id,
        parentId: todoListObj.ref.parent.parent.id,
        ...todoListObj.data()
      }

      todoLists.push(currentTodoList);
    });

    return todoLists;
  }
}
