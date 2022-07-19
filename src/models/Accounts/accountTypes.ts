import { IProject } from '../Projects/projectTypes';

export interface IAccount {
    id: string;
    ownerId: string;
    projects: IProject[];
}