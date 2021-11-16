import TaskGroup from '../../../models/taskGroups';

export default async (req, res) => {
  try {
    const { ownerId } = req;

    const id = await TaskGroup.query().insert({
      ...req.body,
      ownerId,
    });

    res.send(id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
