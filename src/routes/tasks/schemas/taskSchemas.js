// schemas.js
const Joi = require('joi');

export default {
  postTaskSchema: Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string().required(),
    }),
    params: Joi.object().keys({
    }),
    query: Joi.object().keys({
    }),
  }),
  getTaskSchema: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    query: Joi.object().keys({}),
  }),
  getTasksSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
};
