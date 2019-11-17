module.exports = (error, req, res, next) => {
  res.status(res.locals.status || 400).json(`Error: ${error}`);
}
