const { Tasks, Projects } = require("../models");

class TaskController {
  static async read(req, res, next) {
    try {
      const { currentUser, params } = req;
      const currentProject = await Projects.findByPk(+params.project_id);
      if (
        currentProject.id_dp === currentUser.id ||
        currentProject.id_pmt === currentUser.id ||
        currentProject.id_field === currentUser.id ||
        currentProject.role === "admin"
      ) {
        const response = await Tasks.findAll({
          where: { id_project: +params.project_id },
          order: [["id", "ASC"]],
        });
        res.status(200).send(response);
      }
      throw { name: "Forbidden" };
    } catch (error) {
      next(error);
    }
  }
  static async readById(req, res, next) {
    try {
      const { currentUser, params } = req;
      const response = await Tasks.findByPk({
        where: { id_project: params.task_id },
      });
      if (
        response.id_dp === currentUser.id ||
        response.id_pmt === currentUser.id ||
        response.id_field === currentUser.id ||
        currentUser.role === "admin"
      ) {
        res.status(200).send(response);
      }
      throw { name: "Forbidden" };
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { body, params } = req;
      const response = await Tasks.create({
        ...body,
        id_project: params.project_id,
      });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      const { params, body } = req;
      const response = await Tasks.update(body, {
        where: { id: params.task_id },
      });
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { currentuser, params } = req;
      const currentTask = await Tasks.findByPk(params.task_id);
      if (
        currentTask.id_pmt === currentuser.id ||
        currentTask.role === "admin"
      ) {
        const response = await Tasks.destroy({
          where: { id: +params.task_id },
        });
        res.status(200).send(response);
      }
      throw { name: "Forbidden" };
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
