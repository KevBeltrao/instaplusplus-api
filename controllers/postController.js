const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  fakeIndex: async (req, res, next) => {
    try {
      res.locals.message = await Post.find();

      next();
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const loggedUser = await User.findById(req.userId);

      res.locals.message = await Post.find({
        $and: [
          { author: { $in: loggedUser.following } },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(10 * req.body.page)
        .limit(10);

      next();
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) next('Post doesn\'t exist');

      res.locals.message = post;

      next();
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    const { filename } = req.file;
    const { description } = req.body;

    try {
      const newPost = await Post.create({
        image: filename,
        description,
        author: req.userId,
      });

      res.locals.message = newPost;

      next();
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.author.toString() !== req.userId) return next('You don\'t have permission to delete this post');

      await Post.findByIdAndDelete(req.params.id);

      res.locals.message = 'Deleted successfully';

      next();
    } catch (error) {
      next(error);
    }
  },
};
