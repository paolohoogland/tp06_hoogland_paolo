const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

exports.getProducts = (req, res) => {
    const search = req.query.search;

    const condition = search ? { product: { [Op.iLike]: `%${search}%` } } : null;

    Products.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
}