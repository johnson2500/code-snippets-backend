// schemas.js
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const Joi = require('joi');

export default {
  postAccountSchema: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
    }).required(),
  }),
  getAccountSchema: Joi.object().keys({
    params: Joi.object().keys({
      accountId: Joi.string(),
    }),
  }),
};
