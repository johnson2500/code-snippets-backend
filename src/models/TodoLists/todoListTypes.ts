import { ITodoListItem } from "../TodoListItems/todoListItemTypes";

export interface ITodoList {
  id?: string;
  projectId?: string;
  ownerId?: string;
  name?: string;
  todoListItems?: ITodoListItem[];
}