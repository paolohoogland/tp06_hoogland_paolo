const products = require('../models/products');

exports.getProducts = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(products));
}