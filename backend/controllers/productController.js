const products = require('../models/products');

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(products));
}