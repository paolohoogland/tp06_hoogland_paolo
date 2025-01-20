module.exports = (sequelize, Sequelize) => {
    const Utilisateurs = sequelize.define("utilisateurs", {
  
     id: {
          type: Sequelize.STRING,
          primaryKey:true,
          allowNull: false
        },  
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pass: {
          type: Sequelize.STRING,
          allowNull: false
      }
   });
  return Utilisateurs;
  };