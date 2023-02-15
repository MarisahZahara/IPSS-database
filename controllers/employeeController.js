const { Employees, Roles, LoginOtp } = require("../models");
const Utils = require("../Utils");

class EmployeeController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmptyEmail" };
      }
      if (!password) {
        throw { name: "EmptyPassword" };
      }

      const currentUser = await Employees.findOne({
        where: { email },
        include: { model: Roles, as: "role" },
      });

      if (!currentUser) {
        throw { name: "LoginError" };
      }
      if (!Utils.compareHashWithPlain(password, currentUser.password)) {
        throw { name: "LoginError" };
      }

      if (currentUser.isVerified == false) {
        let date = Date.now();
        let otp = Math.floor(100000 + Math.random() * 900000);
        await LoginOtp.update(
          {
            status: 1,
          },
          {
            where: { user_id: currentUser.id },
          }
        );
        await LoginOtp.create({
          user_id: currentUser.id,
          OTP: otp,
          expiredDate: date + 120000,
          status: 0,
          createdAt: date,
          updatedAt: date,
        });

        Utils.sendOTPEmail(otp, email);

        res.status(200).send({ message: "OTP generated!" });
      } else {
        const payload = {
          id: currentUser.id,
          email: currentUser.email,
          role: currentUser.role.user_role,
        };
        console.log("masuk sini");

        res.status(200).send({ token: Utils.createToken(payload) });
      }
    } catch (error) {
      next(error);
    }
  }

  static async verifyOtp(req, res, next) {
    try {
      const { body, query } = req;
      const currentUser = await Employees.findOne({
        where: { email: query.email },
        attributes: {
          exclude: ["password"],
        },
        include: { model: Roles, as: "role" },
      });

      const currentOTP = await LoginOtp.findOne({
        where: { user_id: currentUser.id, OTP: body.OTP },
      });

      let difference =
        new Date(currentOTP.expiredDate).getTime() - new Date().getTime();

      if (difference < 1) {
        throw { name: "OTPExpiredError" };
      }

      if (currentOTP.status === 1) {
        throw { name: "InvalidOTPError" };
      }

      const payload = {
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role.user_role,
      };

      await LoginOtp.update(
        {
          status: 1,
        },
        {
          where: { id: currentOTP.id },
        }
      );

      await Employees.update(
        {
          isVerified: true,
        },
        {
          where: {
            id: currentUser.id,
          },
        }
      );

      res.status(200).send({ token: Utils.createToken(payload) });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const response = await Employees.findAll({
        attributes: { exclude: ["password", "id_role"] },
        include: {
          model: Roles,
          as: "role",
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        order: [["id", "ASC"]],
      });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  static async readById(req, res, next) {
    try {
      const response = await Employees.findByPk(req.params.id, {
        attributes: { exclude: ["password", "id_role"] },
        include: {
          model: Roles,
          as: "role",
          attributes: { exclude: ["updatedAt", "createdAt"] },
        },
      });

      if (!response) {
        throw { name: "EmployeeNotFound" };
      } else {
        res.status(200).send(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { currentUser, body } = req;
      if (currentUser.role !== "admin") {
        throw { name: "Forbidden" };
      }
      await Employees.create({ ...body, isVerified: false });
      res.status(200).send({ message: "Berhasil register!" });
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      const { body, params, currentUser } = req;
      if (currentUser.role === "admin") {
        await Employees.update(body, {
          where: { id: params.id },
        });
      } else {
        throw { name: "Forbidden" };
      }

      res.status(200).send({ message: "Akun berhasil di edit!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { body, params, currentUser } = req;
      const payload = {
        password: Utils.createHash(body.password),
      };

      if (currentUser.role === "admin") {
        await Employees.update(payload, {
          where: { id: params.id },
        });
        res.status(200).send({ message: "Password berhasil diganti!" });
      } else {
        throw { name: "Forbidden" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      await Employees.destroy({
        where: { id: +req.params.id },
      });
      res.sendStatus(200).send({ message: "Berhasil delete!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = EmployeeController;
