const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };
