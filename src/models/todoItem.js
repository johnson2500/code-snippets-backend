// eslint-disable-next-line import/no-unresolved
import TodoList from './todoList';

export default class TodoItem extends TodoList {
  constructor(ownerId, projectId, todoListId, todoListItemId) {
    super(ownerId, projectId, todoListId, todoListItemId);
    this.todoListItemId = todoListItemId;
    this.todoListItemsCollectionName = 'todoListItems';
  }

  getFullTodoListItemRef() {
    console.log('getting ref');
    return this.getFullTodoListRef().collection(this.todoListItemsCollectionName);
  }

  async addTodoListItem(data) {
    console.log('getting ref');

    return this.getFullTodoListItemRef()
      .add(data);
  }

  async getTodoListItem() {
    return this.getFullTodoListItemRef()
      .doc(this.todoListItemId)
      .get();
  }

  async getTodoListItems(ownerId, todoListCollectionId) {
    return this.getTodoListsRef(ownerId)
      .doc(todoListCollectionId)
      .collection(this.itemsCollectionName)
      .get();
  }
}
