"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.VendorReq, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      profile: DataTypes.STRING,
      roleId: { type: DataTypes.INTEGER, defaultValue: 3 },
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      emailToken: DataTypes.STRING,
      shopId: { type: DataTypes.INTEGER, defaultValue: null },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
