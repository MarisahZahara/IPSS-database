"use strict";
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_project: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Projects",
          },
          key: "id",
        },
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      status_desk: {
        type: Sequelize.STRING,
      },
      due_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Tasks");
  },
};
