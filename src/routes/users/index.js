// eslint-disable-next-line import/no-unresolved
import checkUsername from './services/checkUsername';
import getUser from './services/getUser';
import postUser from './services/postUser';
import validator from '../../helpers/validator';
import usersSchemas from './schemas/usersSchemas';
import signUpUser from './services/signUpUser';

export default (app) => {
  app.post(
    '/user/sign-up',
    validator(usersSchemas.signUpUserSchema),
    signUpUser,
  );
  app.post(
    '/user',
    validator(usersSchemas.postUserSchema),
    postUser,
  );
  app.get(
    '/user/:id',
    validator(usersSchemas.getUserSchema),
    getUser,
  );
  app.get(
    '/user-name/available',
    validator(usersSchemas.checkUsernameSchema),
    checkUsername,
  );
  app.put(
    '/user',
    validator(usersSchemas.putUserSchema),
    checkUsername,
  );
};
