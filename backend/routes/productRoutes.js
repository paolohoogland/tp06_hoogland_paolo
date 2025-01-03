// const express = require('express');
// const router = express.Router();
// const products = require('../models/products');

// router.get('/', (req, res) => {
//   res.json(products);
// });

// module.exports = router;

module.exports = app => {
  const productsController = require('../controllers/productsController');

  let router = require('express').Router();

  router.get('/', productsController.getProducts);

  app.use('/api/products', router);
}