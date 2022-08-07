import Project from '../../../models/Projects/projectRef';
import { IProject } from '@server/types/projectTypes';
import { defaultProject } from '@server/seedData/initProject';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { logger } from '@server/config/logger';
import { Request, Response} from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId } = req;
    const project = new Project(ownerId);

    logger.info({ message: 'Initializing User' });

    const projectToAdd: IProject = defaultProject(ownerId)

    const projectData = await project.addProject(projectToAdd);
    const projectId = projectData.id;

    logger.info({ message: 'Initializing Todo List' });

    const responseObj: IProject = {...projectToAdd, id: projectId}

    res.send(reponseTransformer(req, responseObj));
  } catch (error: any) {
    console.log(error);

    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};
