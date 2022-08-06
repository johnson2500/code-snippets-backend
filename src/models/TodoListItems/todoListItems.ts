import TodoLists from '../TodoLists/todoLists';
import { ITodoListItem } from './todoListItemTypes'

export default class TodoItems extends TodoLists {
  ownerId: string;
  todoListItemId: string;
  todoListItemsCollectionName: string;

  constructor(ownerId: string, projectId:string, todoListId:string, todoListItemId: string = null) {
    super(ownerId, projectId, todoListId);
    this.todoListItemId = todoListItemId;
    this.todoListItemsCollectionName = 'todoListItems';
  }

  getFullTodoListItemRef(): FirebaseFirestore.CollectionReference {
    return this.getFullTodoListRef().collection(this.todoListItemsCollectionName);
  }

  async addTodoListItem(data: ITodoListItem): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    return this.getFullTodoListItemRef()
      .add(data);
  }

  async getTodoListItem(): Promise<FirebaseFirestore.DocumentData>  {
    return this.getFullTodoListItemRef()
      .doc(this.todoListItemId)
      .get();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getTodoListItems(): Promise<ITodoListItem[]> {
    const todoListItemSnapshot = await this.getTodoListRef()
      .doc(this.todoListId)
      .collection(this.todoListItemsCollectionName)
      .get();

    const todoListItems = [];
    todoListItemSnapshot.forEach((todoListItemObj) => {
      todoListItems.push({
        id: todoListItemObj.id,
        ownerId: this.ownerId,
        todoListId: todoListItemObj.ref.parent.parent.id,
        ...todoListItemObj.data(),
      });
    });

    return todoListItems;
  }
}
