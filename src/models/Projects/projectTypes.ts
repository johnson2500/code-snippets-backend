import { ITodoList } from "../TodoLists/todoListTypes";

export interface IProject {
  id: string
  ownerId?: string;
  name: string;
  todoLists?: ITodoList[];
}