// eslint-disable-next-line import/no-unresolved
import initUser from './services/createAllService';
import initUserSchemas from './schemas/signUpSchemas';
import validator from '../../helpers/validator';

export default (app) => {
  app.post(
    '/init-user',
    validator(initUserSchemas.createAllValidation),
    initUser,
  );
};
