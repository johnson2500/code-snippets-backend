import Project from '../../../models/project';

export default async (req, res) => {
  const { ownerId, body } = req;
  const project = new Project(ownerId);

  const data = await project.addProject({ ...body });

  res.send(data);
};
