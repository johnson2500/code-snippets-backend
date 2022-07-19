import reponseTransformer from '../../../helpers/reponseTransformer';
import Accounts from '../../../models/Accounts/accounts';
import Projects from '../../../models/Projects/projects';
import TodoLists from '../../../models/TodoLists/todoLists';
import TodoItems from '../../../models/TodoListItems/todoListItems';
import { Request, Response} from 'express'


export default async (req: Request, res: Response): Promise<void> => {
  const { ownerId } = req;

  const account = new Accounts(ownerId);
  const accountData = await account.getAccount();

  const project = new Projects(ownerId);

  const projectsData = await project.getProjects();
  const todoListsPromises = [];
  projectsData.forEach((projectObj) => {
    const projectId = projectObj.id;
    const todoList = new TodoLists(ownerId, projectId);
    todoListsPromises.push(todoList.getTodoLists()); 
  });

  const todoListsData = await Promise.all(todoListsPromises);
  const parsedProjectData = [];
  projectsData.forEach((projectObj) => {
    const todoLists = todoListsData
      .filter((todoListObj) => todoListObj[0]?.parentId === projectObj.id);
    parsedProjectData.push({
      ...projectObj,
      todoLists: todoLists[0],
    });
  });

  const todoListItemsPromiseArray = [];
  parsedProjectData.forEach((projectObj) => {
    const { todoLists = [], id: projectId } = projectObj;
    todoLists.forEach((todoListObj) => {
      const { id: todoListId } = todoListObj;
      const todoListItem = new TodoItems(ownerId, projectId, todoListId);
      todoListItemsPromiseArray.push(todoListItem.getTodoListItems());
    });
  });

  const todoListItemsData = await Promise.all(todoListItemsPromiseArray);

  const finalParsedProjects = [];
  parsedProjectData.forEach((projectObj) => {
    const { todoLists = [] } = projectObj;
    todoLists.forEach((todoListObj) => {
      const todoListItemsParsed = [];
      const { id: todoListId } = todoListObj;
      const todoListsFilterd = todoListItemsData.map((item) => item[0])
        .filter((item) => item?.parentId === todoListId);
      todoListItemsParsed.push(todoListsFilterd);

      finalParsedProjects.push({
        ...projectObj,
        todoLists: {
          ...todoListObj,
          todoListItems: todoListItemsParsed[0],
        },
      });
    });
    finalParsedProjects.push({
      ...projectObj,
      todoLists: { },
    });
  });

  const responseData = {
    account: {
      id: accountData.id,
      projects: finalParsedProjects,
    },
  };
  res.header('Access-Control-Allow-Origin', '*');
  res.send(reponseTransformer(req, responseData));
};
