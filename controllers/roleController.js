const { Roles } = require("../models");

class RoleController {
  static async read(_, res, next) {
    try {
      const allRoles = await Roles.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(allRoles);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoleController;
