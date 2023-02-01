"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init(
    {
      id_project: DataTypes.INTEGER,
      deskripsi: DataTypes.TEXT,
      status_desk: DataTypes.STRING,
      due_date: DataTypes.DATE,
      id_pmt: DataTypes.INTEGER,
      id_dp: DataTypes.INTEGER,
      id_field: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
