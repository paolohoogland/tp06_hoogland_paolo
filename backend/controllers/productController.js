const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

exports.getProducts = (req, res) => {
    Products.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
}