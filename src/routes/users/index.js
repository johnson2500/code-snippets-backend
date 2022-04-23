import checkUsername from './services/checkUsername';
import getUsers from './services/getUsers';
import getUser from './services/getUser';
import postUser from './services/postUser';
import initializeUser from './services/initializeUser';
import validator from '../../helpers/validator';
import usersSchemas from './schemas/usersSchemas';
import sessionLogin from './services/sessionLogin';

export default (app) => {
  app.post(
    '/user/initialize',
    validator(usersSchemas.initializeUserSchema),
    initializeUser,
  );
  app.post('/user/session-login', validator(usersSchemas.sessionLoginSchema), sessionLogin);
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
    '/users',
    validator(usersSchemas.getUsersSchema),
    getUsers,
  );
  app.get(
    '/user-name/exists',
    validator(usersSchemas.checkUsernameSchema),
    checkUsername,
  );
  app.put(
    '/user',
    validator(usersSchemas.putUserSchema),
    checkUsername,
  );
};
