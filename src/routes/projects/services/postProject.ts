import Project from '../../../models/projectModel';
import express, { Request} from 'express'

export default async (req: Request, res: express.Response): Promise<void> => {
  const { ownerId, body } = req;
  const project: Project = new Project(ownerId);

  const data = await project.addProject({ ...body });

  res.send(data);
};
