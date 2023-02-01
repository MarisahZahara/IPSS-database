const { Projects } = require("../models");
const { Op } = require("sequelize");

class ProjectController {
  static async read(req, res, next) {
    try {
      const { currentUser } = req;
      let response;
      if (req.currentUser.role === "admin") {
        response = await Projects.findAll({
          order: [["id", "ASC"]],
        });
      } else {
        response = await Projects.findAll({
          where: {
            [Op.or]: [
              { id_pmt: currentUser.id },
              { id_field: currentUser.id },
              { id_dp: currentUser.id },
            ],
          },
          order: [["id", "ASC"]],
        });
      }

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  static async readById(req, res, next) {
    try {
      const { params } = req;
      const response = await Projects.findByPk({
        where: { id: params.id },
      });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body, currentUser } = req;

      const response = await Projects.create({
        ...body,
        id_admin: currentUser.id,
      });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      const { currentUser, body, params } = req;

      const currentProject = await Projects.findByPk(+params.id);
      console.log(currentProject);
      if (
        +currentProject.id_dp === +currentUser.id ||
        +currentProject.id_pmt === +currentUser.id ||
        +currentProject.id_field === +currentUser.id ||
        currentUser.role === "admin"
      ) {
        const response = await Projects.update(body, {
          where: { id: params.id },
        });
      } else {
        throw { name: "Forbidden" };
      }
      res.status(200).send({ message: "Update project berhasil!" });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { params } = req;
      const response = await Projects.destroy({
        where: { id: +params.id },
      });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;
