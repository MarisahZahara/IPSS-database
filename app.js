const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
// const db = require("./config/db.config.js");

//Controllers
const EmployeeController = require("./controllers/employeeController");
const RoleController = require("./controllers/roleController");
const ProjectController = require("./controllers/projectController");
const TaskController = require("./controllers/taskController");
const authentication = require("./middleware/authentication");
const Authorization = require("./middleware/authorization");
const errorHandler = require("./middleware/errorHandler");

// db.authenticate()
//   .then((a) => console.log("Database connected", a))
//   .catch((err) => console.log("error", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Auth
app.post("/user/login", EmployeeController.login);
app.post("/user/login/verify", EmployeeController.verifyOtp);

// app.use(authentication);

//User Management
app.post("/user/register", EmployeeController.register);

//Roles
app.get("/roles", RoleController.read);

//Employees
app.get("/employees", Authorization.employee, EmployeeController.read);
app.patch(
  "/employee/reset_password/:id",
  Authorization.employee,
  EmployeeController.resetPassword
);
app.get("/employee/:id", Authorization.employee, EmployeeController.readById);
app.put("/employee/:id", Authorization.employee, EmployeeController.edit);
app.delete("/employee/:id", Authorization.employee, EmployeeController.delete);

//Projects
app.get("/projects", Authorization.project, ProjectController.read);
app.post("/project", Authorization.project, ProjectController.create);
app.get("/project/:id", Authorization.project, ProjectController.readById);
app.put("/project/:id", Authorization.project, ProjectController.edit);
app.delete("/project/:id", Authorization.project, ProjectController.delete);

//Tasks
app.get("/tasks/project/:project_id", TaskController.read);
app.post("/task/project/:project_id", TaskController.create);
app.get("/task/:task_id", ProjectController.readById);
app.put("/task/:task_id", TaskController.edit);
app.delete("/task/:task_id", TaskController.delete);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
