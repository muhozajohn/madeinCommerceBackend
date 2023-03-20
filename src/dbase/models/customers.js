'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customers.belongsToMany(models.Products, {through:"cart"})
      Customers.belongsToMany(models.Products, { through: "wishlist" });

      
    }
  }
  Customers.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    profile: DataTypes.STRING,
    roleId: {type:DataTypes.INTEGER,
    defaultValue: 3},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};