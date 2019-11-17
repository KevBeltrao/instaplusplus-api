const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.locals.status = 401;
    return next('No token provided');
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    res.locals.status = 401;
    return next('Wrong format token');
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.locals.status = 401;
    return next('Invalid token');
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      res.locals.status = 401;
      return next('Invalid token');
    }

    req.userId = decoded.id;

    next();
  });

}
