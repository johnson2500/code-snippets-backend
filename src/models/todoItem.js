// eslint-disable-next-line import/no-unresolved
import TodoList from './todoList';

export default class TodoItem extends TodoList {
  constructor(ownerId, projectId, todoListId, todoListItemId) {
    super(ownerId, projectId, todoListId, todoListItemId);
    this.todoListItemId = todoListItemId;
    this.todoListItemsCollectionName = 'todoListItems';
  }

  getFullTodoListItemRef() {
    return this.getFullTodoListRef().collection(this.todoListItemsCollectionName);
  }

  async addTodoListItem(data) {
    return this.getFullTodoListItemRef()
      .add(data);
  }

  async getTodoListItem() {
    return this.getFullTodoListItemRef()
      .doc(this.todoListItemId)
      .get();
  }

  async getTodoListItems() {
    const todoListItemSnapshot = await this.getTodoListRef()
      .doc(this.todoListId)
      .collection(this.todoListItemsCollectionName)
      .get();

    const todoListItems = [];
    todoListItemSnapshot.forEach((todoListItemObj) => {
      todoListItems.push({
        id: todoListItemObj.id,
        parentId: todoListItemObj.ref.parent.parent.id,
        ...todoListItemObj.data(),
      });
    });

    return todoListItems;
  }
}
