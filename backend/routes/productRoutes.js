module.exports = app => {
  const productsController = require('../controllers/productsController');

  let router = require('express').Router();

  router.get('/', productsController.getProducts);

  app.use('/api/products', router);
}