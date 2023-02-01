const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const db = new Sequelize(process.env.DB_URI, {
  define: {
    timestamps: false,
  },
});

module.exports = db;
