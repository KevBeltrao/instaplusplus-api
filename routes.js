const router = require('express').Router();
const multer = require('multer');

const uploadConfig = require('./config/upload');

const requestHandler = require('./helpers/requestHandler');
const errorHandler = require('./helpers/errorHandler');
const auth = require('./helpers/auth');
const upload = multer(uploadConfig);

const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const followController = require('./controllers/followController');
const postController = require('./controllers/postController');

router.route('/user')
  .get(userController.index, requestHandler, errorHandler)
  .post(userController.store, requestHandler, errorHandler);
router.route('/user/:id').get(userController.show, requestHandler, errorHandler);

router.route('/user/follow/:id')
  .post(auth, followController.store, requestHandler, errorHandler)
  .delete(auth, followController.destroy, requestHandler, errorHandler);

router.route('/login').post(sessionController.store, requestHandler, errorHandler);

router.route('/post')
  .get(auth, postController.index, requestHandler, errorHandler)
  .post(auth, upload.single('image'), postController.store, requestHandler, errorHandler);
router.route('/post/:id')
  .get(postController.show, requestHandler, errorHandler)
  .delete(auth, postController.destroy, requestHandler, errorHandler);

module.exports = router;
