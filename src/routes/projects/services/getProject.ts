import Project from '../../../models/Projects/projectRef';
import reponseTransformer from '../../../helpers/reponseTransformer';

import express, { Request } from 'express'

export default async (req: Request, res: express.Response): Promise<void> => {

  const { ownerId, params: { projectId } } = req;

  const project = new Project(ownerId, projectId);

  const data = await project.getProject();

  res.send(reponseTransformer(req, { ...data.data(), id: data.id }));
};
