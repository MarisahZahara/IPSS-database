"use strict";
const { Model } = require("sequelize");
const Utils = require("../Utils");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employees.belongsTo(models.Roles, {
        foreignKey: "id_role",
        as: "role",
      });
    }
  }
  Employees.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Email sudah terpakai",
        },
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
        },
      },
      jabatan: {
        type: DataTypes.STRING,
      },
      id_role: {
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Nomor telepon sudah terpakai",
        },
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone Number is required" },
          notNull: { msg: "Phone Number is required" },
        },
      },
      gender: {
        type: DataTypes.STRING,
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );

  Employees.beforeCreate((instanceUser, options) => {
    const hashedPassword = Utils.createHash(instanceUser.password);
    instanceUser.password = hashedPassword;
  });

  return Employees;
};
