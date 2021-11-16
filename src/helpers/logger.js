export default (req, res, next) => {
  console.log(`${Date.now()}: ${req.path}`);
  next();
};
