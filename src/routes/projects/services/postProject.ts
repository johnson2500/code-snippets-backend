import Projects from '../../../models/Projects/projects';
import express, { Request} from 'express'

export default async (req: Request, res: express.Response): Promise<void> => {
  const { ownerId, body } = req;
  const project: Projects = new Projects(ownerId);

  const data = await project.addProject({ ...body });

  res.send(data);
};
