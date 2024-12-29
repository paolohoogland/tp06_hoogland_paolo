const express = require('express');
const router = express.Router();
const products = require('../models/products');

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;