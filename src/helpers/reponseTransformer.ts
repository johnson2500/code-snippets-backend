export default (req, data, metadata = {}) => ({
  metadata: {
    ...metadata,
    method: req.method,
  },
  data,
});
