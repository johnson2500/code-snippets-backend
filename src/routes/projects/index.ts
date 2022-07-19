import projectSchemas from './schemas/projectSchemas';
import validator from '../../helpers/validator';
import getProject from './services/getProject';
import postProject from './services/postProject';
import express from 'express'

export default (app: express.Application): void => {
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
