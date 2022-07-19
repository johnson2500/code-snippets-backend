// schemas.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

export default {
  postProjectSchema: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
    }),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
  getProjectSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({
      projectId: Joi.string().required(),
    }).required(),
    query: Joi.object().keys({}),
  }),
  getProjectsSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
};
