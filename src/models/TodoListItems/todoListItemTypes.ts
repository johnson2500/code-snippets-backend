export interface ITodoListItem {
    [x: string]: any;
    id?: string;
    todoListId?: string;
    ownerId: string;
    title: string;
    description?: string;
    tags?: string[];
    duDate?: Date;
}