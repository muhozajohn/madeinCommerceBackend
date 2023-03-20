"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Vendors, {
        foreignKey: "vendorId",
      });
      Products.belongsToMany(models.Customers, { through: "cart" });
      Products.belongsToMany(models.Customers, { through: "wishlist" });
      Products.belongsToMany(models.Category, { through: "categories" });
    }
  }
  Products.init(
    {
      productName: DataTypes.STRING,
      productImage: DataTypes.STRING,
      productCategory: DataTypes.STRING,
      productPrice: DataTypes.INTEGER,
      productDiscount: DataTypes.INTEGER,
      productDescription: DataTypes.STRING,
      productTags: DataTypes.STRING,
      vendorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
