import { appLogger } from '../../../helpers/logger';
import Todos from '../../../models/todo';

const todos = new Todos();

export default async (req, res) => {
  try {
    const { ownerId, params: { todoListId } } = req;

    appLogger(`Getting tasks for ${ownerId}`);

    const todoList = await todos.getTodoList(ownerId, todoListId);
    const { title: todoListTitle } = todoList.data();

    const todoItems = await todos.getTodoListItems(ownerId, todoListId);

    const todoItemsResponse = [];
    todoItems.forEach((val) => {
      todoItemsResponse.push(val.data());
    });

    res.send({
      todoList: {
        id: todoList.id,
        name: todoListTitle,
        todoItems: todoItemsResponse,
      },
    });
  } catch (error) {
    appLogger(error);
    res.status(500).send(error.message);
  }
};
