import reponseTransformer from '../../../helpers/reponseTransformer';
import Account from '../../../models/accountModel';
import Project from '../../../models/projectModel';
import TodoList from '../../../models/todoList';
import TodoItem from '../../../models/todoItem';
import { Request, Response} from 'express'


export default async (req: Request, res: Response): Promise<void> => {
  const { ownerId } = req;

  const account = new Account(ownerId);
  const accountData = await account.getAccount();

  const project = new Project(ownerId);

  const projectsData = await project.getProjects();
  const todoListsPromises = [];
  projectsData.forEach((projectObj) => {
    const projectId = projectObj.id;
    const todoList = new TodoList(ownerId, projectId);
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
      const todoListItem = new TodoItem(ownerId, projectId, todoListId);
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
