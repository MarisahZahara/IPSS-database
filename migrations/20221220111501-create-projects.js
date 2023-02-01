"use strict";
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Employees",
          },
          key: "id",
        },
        allowNull: false,
      },
      project_name: {
        type: Sequelize.STRING,
      },
      client_name: {
        type: Sequelize.STRING,
      },
      background_project: {
        type: Sequelize.TEXT,
      },
      target_sample: {
        type: Sequelize.INTEGER,
      },
      methodology: {
        type: Sequelize.STRING,
      },
      project_specification: {
        type: Sequelize.TEXT,
      },
      client_service: {
        type: Sequelize.STRING,
      },
      fw_start: {
        type: Sequelize.DATE,
      },
      fw_end: {
        type: Sequelize.DATE,
      },
      status_project: {
        type: Sequelize.STRING,
      },
      durasi_planned: {
        type: Sequelize.STRING,
      },
      durasi_plan: {
        type: Sequelize.STRING,
      },
      total_remaining_days: {
        type: Sequelize.STRING,
      },
      PPI: {
        type: Sequelize.FLOAT,
      },
      API: {
        type: Sequelize.FLOAT,
      },
      CPI: {
        type: Sequelize.INTEGER,
      },
      remark: {
        type: Sequelize.STRING,
      },
      achievement: {
        type: Sequelize.INTEGER,
      },
      shortfall_achievement: {
        type: Sequelize.INTEGER,
      },
      sending_data: {
        type: Sequelize.STRING,
      },
      id_pmt: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Employees",
          },
          key: "id",
        },
        allowNull: true,
      },
      id_field: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Employees",
          },
          key: "id",
        },
        allowNull: true,
      },
      id_dp: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Employees",
          },
          key: "id",
        },
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects");
  },
};
