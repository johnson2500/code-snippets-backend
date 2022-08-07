// schemas.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

export default {
  postTaskItemSchema: Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string().required(),
      projectId: Joi.string().required()
    }),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
};
