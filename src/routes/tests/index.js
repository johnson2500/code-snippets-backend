export default (app) => {
  app.get(
    '/test',
    async (req, res) => {
      res.send(JSON.stringify({}));
    },
  );
};
