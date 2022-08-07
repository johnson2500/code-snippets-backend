import {Moment} from 'moment'

export interface ITimestamps{
    deletedAt?: Moment;
    createdAt: Moment;
    updatedAt?: Moment;
}

export interface ITaskItem {
    id: string;
    title: string;
    timestamps: ITimestamps;
    description?: string;
    dueDate?: string;
}

export interface ITaskList {
    id: string;
    name: string;
    timestamps: ITimestamps;
    taskItems: ITaskItem[];
}

export interface IProject {
    id: string;
    name: string;
    ownerId: string;
    timestamps: ITimestamps;
    taskList: ITaskList;
}