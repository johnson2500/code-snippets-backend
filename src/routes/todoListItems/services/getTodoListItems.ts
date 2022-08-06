import { logger } from '@server/config/logger';

import Todos from '../../../models/TodoLists/todoLists';
import {Response, Request} from 'express'
import { TodoListItems } from '@server/models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId, params: { todoListId, projectId } } = req;
    
    const todos = new Todos(ownerId, projectId, todoListId);
    const todoListItems = new TodoListItems(ownerId, projectId, todoListId)
    logger.info(`Getting tasks for ${ownerId}`);

    const todoList = await todos.getTodoList(todoListId);
    const { title: todoListTitle } = todoList.data();

    const todoItems = await todoListItems.getTodoListItems();

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
  } catch (error: any) {
    logger.info(error);
    res.status(500).send(error.message);
  }
};
