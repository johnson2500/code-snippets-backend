import { getUserId } from './index';
import admin from '../firebase';

const expceptions = new Set([
  '/user-name/exists',
]);

export default async (req, res, next) => {
  try {
    console.log(expceptions.has(req.path));
    if (expceptions.has(req.path)) {
      next();
      return;
    }
    const { authorization } = req.headers;
    const token = authorization.split('Bearer ')[1];
    const ownerId = await getUserId(admin, token);
    req.ownerId = ownerId;
  } catch (error) {
    console.log(`${Date.now()}: Authentication Error: ${error.message}`);
    res.status(401).send(error.message);
    return;
  }
  next();
};
