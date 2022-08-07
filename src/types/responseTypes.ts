import { IProject } from "./projectTypes"

export interface IMetadata {
    method: string;
}

export interface IProjectResponse {
    data: IProject;
    metadata: IMetadata;
}

export interface IProjectsResponse {
    metadata: IMetadata;
    data: IProject[];
}