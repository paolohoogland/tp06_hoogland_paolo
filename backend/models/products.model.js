module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
     id: {
          type: Sequelize.STRING,
          primaryKey:true,
          allowNull: false
        },  
      product: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      unit: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      categories: {
        type: Sequelize.STRING,
      }
   });
  return Products;
  };