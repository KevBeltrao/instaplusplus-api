const jwt = require('jsonwebtoken');

module.exports = (param) => jwt.sign(param, process.env.SECRET, {
  expiresIn: 86400,
});
