"use strict";

const Utils = require("../Utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          email: "idadm0001.com",
          password: Utils.createHash("ADM12345678"),
          id_role: 1,
          firstName: "Ahmad",
          lastName: "Baur",
          phone: "0812333333",
          gender: "male",
          isVerified: true,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          email: "idpmt01.com",
          password: Utils.createHash("PMT12345678"),
          id_role: 3,
          firstName: "Atikah",
          lastName: "Sari",
          phone: "081244445",
          gender: "female",
          isVerified: true,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          email: "iddp0001.com",
          password: Utils.createHash("DP12345678"),
          id_role: 4,
          firstName: "Tri",
          lastName: "Ayu",
          phone: "081366666",
          gender: "female",
          isVerified: true,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          email: "idfield0001.com",
          password: Utils.createHash("FIELD12345678"),
          id_role: 2,
          firstName: "Bagas",
          lastName: "Anjas",
          phone: "08122222222",
          gender: "male",
          isVerified: true,
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
