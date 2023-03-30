'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      customer: DataTypes.JSON,
      productOrdered: DataTypes.JSON,
      totalPrice: DataTypes.INTEGER,
      date: DataTypes.DATE,
      delivered: { type: DataTypes.STRING, defaultValue: "Not  delivered" },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};