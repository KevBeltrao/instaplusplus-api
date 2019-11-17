const bcrypt = require('bcryptjs');

const User = require('../models/User');
const generateToken = require('../config/generateToken.js');

module.exports = {
  store: async (req, res, next) => {
    const { email, password } = req.body;  
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) next('Email not registered');

      if (!await bcrypt.compare(password, user.password)) next('Wrong password');

      user.password = undefined;

      res.locals.message = {
        user,
        token: generateToken({ id: user.id }),
      };

      next();
    } catch (error) {
      next(error);
    }
  },
};

