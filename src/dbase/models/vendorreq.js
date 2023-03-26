"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VendorReq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VendorReq.belongsToMany(models.Users, { through: "vendorrequest" });
    }
  }
  VendorReq.init(
    {
      shopName: DataTypes.STRING,
      shopAddress: DataTypes.STRING,
      vendorData: DataTypes.JSON,
      roleId: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VendorReq",
    }
  );
  return VendorReq;
};
