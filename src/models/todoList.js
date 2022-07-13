// eslint-disable-next-line import/no-unresolved
import Project from './project';

export default class TodoList extends Project {
  constructor(ownerId, projectId, todoListId) {
    super(ownerId, projectId);
    this.todoListId = todoListId;
    this.listsCollectionName = 'todoLists';
  }

  getTodoListRef() {
    return this.getFullProjectRef().collection(this.listsCollectionName);
  }

  getFullTodoListRef() {
    return this.getFullProjectRef().collection(this.listsCollectionName).doc(this.todoListId);
  }

  async addTodoList(data) {
    const todoListRef = this.getTodoListRef();
    return todoListRef.add(data);
  }

  async getTodoList(id) {
    return this.getTodoListRef().doc(id).get();
  }

  async getTodoLists() {
    const todoListsSnapshot = await this.getTodoListRef().get();

    const todoLists = [];
    todoListsSnapshot.forEach((todoListObj) => {
      todoLists.push({
        id: todoListObj.id,
        parentId: todoListObj.ref.parent.parent.id,
        ...todoListObj.data(),
      });
    });

    return todoLists;
  }
}
