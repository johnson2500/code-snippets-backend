// schemas.js
const Joi = require('joi');

export default {
  createAllValidation: Joi.object().keys({
    body: Joi.object().keys({
      userName: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
};
