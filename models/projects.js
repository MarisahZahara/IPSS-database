"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projects.init(
    {
      id_admin: DataTypes.INTEGER,
      project_name: DataTypes.STRING,
      client_name: DataTypes.STRING,
      background_project: DataTypes.TEXT,
      target_sample: DataTypes.INTEGER,
      methodology: DataTypes.STRING,
      project_specification: DataTypes.TEXT,
      client_service: DataTypes.STRING,
      fw_start: DataTypes.DATE,
      fw_end: DataTypes.DATE,
      status_project: DataTypes.STRING,
      durasi_planned: DataTypes.STRING,
      durasi_plan: DataTypes.STRING,
      total_remaining_days: DataTypes.STRING,
      PPI: DataTypes.FLOAT,
      API: DataTypes.FLOAT,
      CPI: DataTypes.INTEGER,
      remark: DataTypes.STRING,
      achievement: DataTypes.INTEGER,
      shortfall_achievement: DataTypes.INTEGER,
      sending_data: DataTypes.STRING,
      id_pmt: DataTypes.INTEGER,
      id_dp: DataTypes.INTEGER,
      id_field: DataTypes.INTEGER,
      status_achievement: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Projects",
    }
  );
  return Projects;
};
