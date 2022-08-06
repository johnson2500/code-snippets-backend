import { Projects, TodoListItems, TodoLists } from '../../../models';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { logger } from '../../../config/logger';
import { Response, Request } from 'express';
import { IProject } from '@server/models/Projects/projectTypes';
import { ITodoList } from '@server/models/TodoLists/todoListTypes';
import { ITodoListItem } from '@server/models/TodoListItems/todoListItemTypes';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId } = req;
    const project: Projects = new Projects(ownerId);

    let projects: IProject[] = await project.getProjects()

    const todoListsPromiseArray = []
    
    projects.forEach(({ id: projectId }) => {
        const todoList: TodoLists = new TodoLists(ownerId, projectId)

        todoListsPromiseArray.push(todoList.getTodoLists())
    })

    const todoLists: ITodoList[][] = await Promise.all(todoListsPromiseArray)
    const flattendTodoLists: ITodoList[] = todoLists.flat()
    const todoListItemsPromiseArray = []

    projects = projects.map((project: IProject) => {
        const { id: projectId } = project;

        const projectTodoLists: ITodoList[] = flattendTodoLists.filter((list: ITodoList) => {
            const { projectId: todoListProjectId, id: todoListId } = list

            if(todoListId) {
                const todoListItem: TodoListItems = new TodoListItems(ownerId, projectId, todoListId)

                todoListItemsPromiseArray.push(todoListItem.getTodoListItems())
            }
            return todoListProjectId == projectId
        })

        return {
            id: project.id,
            name: project.name,
            todoLists: projectTodoLists
        }
    })

    const todoListItems: ITodoListItem[][] = await Promise.all(todoListItemsPromiseArray)
    const flattendTodoListItems: ITodoListItem[] = todoListItems.flat().filter(item =>  Object.keys(item).length !== 0)

    projects = projects.map((project: IProject) => {
        const { id: projectId } = project

        const projectTodoLists: ITodoList[] = flattendTodoLists.filter(todoList => todoList.projectId === projectId).map((list: ITodoList) => {
            const { id: todoListId } = list

            if(todoListId) {
                const todoListItemsForList: ITodoListItem[] = flattendTodoListItems.filter((item: ITodoListItem)=> item.todoListId === todoListId)
                return {
                    ...list,
                    todoListItems: todoListItemsForList
                }
            }
            return {}
        })


        return {
            ...project,
            todoLists: projectTodoLists
        }
    })


    res.send(reponseTransformer(req, { projects }));
  } catch (error: any) {
    logger.info(error);
    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};

