import Users from "../../../models/users";

export default async (req, res) => {
    try {
      const { body, ownerId } = req;
      const id = await Users.query().insert({
        ...body,
        ownerId,
      });

      res.send(id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
}