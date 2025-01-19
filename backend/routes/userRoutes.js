const {authenticate} = require('../middleware/authMiddleware');

module.exports = app => { 
    
    const userController = require('../controllers/userController');

    let router = require('express').Router();

    router.post('/register', userController.registerUser);
    router.post('/login', userController.loginUser);
    router.get('/user', authenticate, userController.getUser);
    router.put('/user', authenticate, userController.updateUser);

    app.use('/api/users', router);
}