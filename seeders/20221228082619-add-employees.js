"use strict";

const Utils = require("../Utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          email: "A@gmail.com",
          password: Utils.createHash("12345678"),
          id_role: 1,
          firstName: "Achmad",
          lastName: "Dadap",
          phone: "081111111",
          gender: "L",
          isVerified: true,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          email: "B@gmail.com",
          password: Utils.createHash("12345678"),
          id_role: 2,
          firstName: "Dhani",
          lastName: "Dudung",
          phone: "08222222",
          gender: "L",
          isVerified: false,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          email: "C@gmail.com",
          password: Utils.createHash("12345678"),
          id_role: 3,
          firstName: "Annisa",
          lastName: "Sahur",
          phone: "083333333",
          isVerified: false,
          gender: "P",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          email: "D@gmail.com",
          password: Utils.createHash("12345678"),
          id_role: 4,
          firstName: "Nunung",
          lastName: "Darwanto",
          phone: "084444444",
          isVerified: false,
          gender: "P",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
