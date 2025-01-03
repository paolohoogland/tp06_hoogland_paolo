const { verifyToken } = require('../middleware/authMiddleware');

module.exports = app => {
  const usersController = require('../controllers/usersController');

  let router = require('express').Router();

  router.get('/', verifyToken, usersController.getUsers);
  router.post('/login', usersController.login);
  router.post('/register', usersController.register);
  router.put('/update', verifyToken, usersController.update);

  app.use('/api/users', router);
}