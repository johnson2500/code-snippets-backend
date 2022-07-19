import { appLogger } from '../../../helpers/logger';
import Project from '../../../models/projectModel';
import TodoList from '../../../models/todoList';
import TodoItem from '../../../models/todoItem';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { Request, Response} from 'express';

const defaults = {
  projectName: 'Default Project',
  todoListName: 'My First Todo List',
  todoListItemData: {
    title: 'Ryans Best Try',
    dueDate: 'Mon Jul 04 2022 14:30:26 GMT-0400 (Eastern Daylight Time)',
    description: 'This is the first item',
    tags: ['cool'],
  },
};

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId } = req;
    const project = new Project(ownerId);

    appLogger({ message: 'Initializing User' });

    const projectData = await project.addProject({ name: defaults.projectName });
    const projectId = projectData.id;

    appLogger({ message: 'Initializing Todo List' });

    const todoList: TodoList = new TodoList(ownerId, projectId);
    const todoListData = await todoList.addTodoList({ name: defaults.todoListName, ownerId });
    const todoListId = todoListData.id;

    appLogger({ message: 'Initializing Todo List Item' });

    const todoListItem = new TodoItem(ownerId, projectId, todoListId);
    const todoListItemData = await todoListItem.addTodoListItem({ ...defaults.todoListItemData, ownerId});
    const todoListItemId = todoListItemData.id;

    const responseObj = {
      project: {
        id: projectId,
        name: defaults.projectName,
        todoList: {
          id: todoListId,
          name: defaults.todoListName,
          todoListItems: [
            {
              id: todoListItemId,
              ...defaults.todoListItemData,
            },
          ],
        },
      },
    };

    res.send(reponseTransformer(req, responseObj));
  } catch (error: any) {
    console.log(error);

    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};
