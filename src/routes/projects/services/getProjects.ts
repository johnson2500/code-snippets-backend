import Project from '../../../models/Projects/projectRef';
import reponseTransformer from '../../../helpers/reponseTransformer';

import express, { Request } from 'express'

export default async (req: Request, res: express.Response): Promise<void> => {
  try {
    const { ownerId, params: { projectId } } = req;

    const project = new Project(ownerId, projectId);
  
    const data = await project.getProjects();
  
    res.send(reponseTransformer(req, data));
  }  catch (error: any) {
    console.log(error);

    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};
