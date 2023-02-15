const Utils = require("../Utils");
const { Employees, Roles } = require("../models");

const authentication = async (req, res, next) => {
  try {
    console.log("masuk authen");
    const { access_token } = req.headers;
    const payload = Utils.verifyToken(access_token);
    const user = await Employees.findByPk(payload.id, {
      include: {
        model: Roles,
        as: "role",
      },
    });

    if (!user) {
      throw { name: "InvalidAccess" };
    } else {
      req.currentUser = {
        id: user.id,
        email: user.email,
        role: user.role.user_role,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
