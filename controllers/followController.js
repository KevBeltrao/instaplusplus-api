const User = require('../models/User');

module.exports = {
  store: async (req, res, next) => {
    const followedId = req.params.id;

    try {
      const user = await User.findById(req.userId);
      const followedUser = await User.findById(followedId);

      if (user.following.indexOf(followedId) !== -1) {
        return next(`${user.name} is already following ${followedUser.name}`);
      }

      const array = user.following;

      await User.findOneAndUpdate({ _id: req.userId }, {
        following: [...array, [followedId]],
      });

      res.locals.message = followedUser;

      next();
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    const unfollowedId = req.params.id;

    try {
      const user = await User.findById(req.userId);
      const unfollowedUser = await User.findById(unfollowedId);

      if (user.following.indexOf(unfollowedId) === -1) {
        return next(`${user.name} is already not following ${unfollowedUser.name}`);
      }

      let array = user.following;
      array.splice(array.indexOf(unfollowedId), 1);

      await User.findOneAndUpdate({ _id: req.userId }, {
        following: array,
      });

      res.locals.message = unfollowedUser;

      next();
    } catch (error) {
      next(error);
    }
  },
};
