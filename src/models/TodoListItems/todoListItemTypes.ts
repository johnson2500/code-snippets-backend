export interface ITodoListItem {
    id?: string;
    ownerId: string;
    title: string;
    description?: string;
    tags?: string[];
    duDate?: Date;
}