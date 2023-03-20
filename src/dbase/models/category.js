'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Products, { through: "categories" });
      // define association here
    }
  }
  Category.init({
    categoryName: DataTypes.STRING,
    categoryDescrptiom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};