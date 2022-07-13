// eslint-disable-next-line import/no-unresolved
import projectSchemas from './schemas/projectSchemas';
import validator from '../../helpers/validator';
import getProject from './services/getProject';
import postProject from './services/postProject';

export default (app) => {
  app.post(
    '/project',
    validator(projectSchemas.postProjectSchema),
    postProject,
  );
  app.get(
    '/project/:projectId',
    validator(projectSchemas.getProjectSchema),
    getProject,
  );
};
