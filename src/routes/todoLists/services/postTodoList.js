import { appLogger } from '../../../helpers/logger';
import Todos from '../../../models/todoList';
import reponseTransformer from '../../../helpers/reponseTransformer';

export default async (req, res) => {
  try {
    const { ownerId, body: { title }, params: { projectId } } = req;
    const todos = new Todos(ownerId, projectId);

    const data = await todos.addTodoList({ title });

    res.send(reponseTransformer(req, { id: data.id }));
  } catch (error) {
    appLogger(error);
    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};
