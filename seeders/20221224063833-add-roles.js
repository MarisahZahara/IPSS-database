"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          user_role: "admin",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 2,
          user_role: "field",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 3,
          user_role: "pm",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 4,
          user_role: "dp",
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

    await queryInterface.bulkDelete("Roles", null, {});
  },
};
