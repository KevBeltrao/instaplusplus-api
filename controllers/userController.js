const User = require('../models/User');
const Post = require('../models/Post');
const generateToken = require('../config/generateToken');

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find();

      res.locals.message = users;

      next();
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);
      
      if (!user) next('User doesn\'t exist');

      const posts = await Post.find({ author: userId });

      res.locals.message = {
        user,
        posts,
      };

      next();
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      if (await User.findOne({ email: req.body.email })) next('User already exists');

      const newUser = await User.create(req.body);

      newUser.password = undefined;

      res.locals.message = {
        user: newUser,
        token: generateToken({ id: newUser.id }),
      };

      next();
    } catch (error) {
      next(error);
    }
  },
};

