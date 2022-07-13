import Project from '../../../models/project';
import reponseTransformer from '../../../helpers/reponseTransformer';

export default async (req, res) => {
  const { ownerId, params: { projectId } } = req;
  console.log(projectId);
  const project = new Project(ownerId, projectId);

  const data = await project.getProject();

  res.send(reponseTransformer(req, { ...data.data(), id: data.id }));
};
