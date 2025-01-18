// import sequalize from "sequalize";
// const sequalize = require("sequalize");
// const { Sequelize } = require("sequelize");

// const sequalize = new Sequelize({
//   host: "localhost",
//   port : 3308,//عشان التعارض مع الوامب 
//   username: "root",
//   password: "",
//   database : "distributed",
//   dialect : "mysql"//نوع الداتا بيز الي بدي اتصل عليها 
// });

// module.exports = sequalize;


// const { Sequelize } = require("sequelize");
// require("dotenv").config(); // To load environment variables from the .env file

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,     // Database host
//   port: process.env.DB_PORT,     // Database port
//   username: process.env.DB_USER, // Database username
//   password: process.env.DB_PASS, // Database password
//   database: process.env.DB_NAME, // Database name
//   dialect: process.env.DB_DIALECT, // Database dialect
// });

// module.exports = sequelize;


const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env

const sequelize = new Sequelize({
  host: process.env.DB_HOST,        // Database host
  port: process.env.DB_PORT,        // Database port
  username: process.env.DB_USER,    // Database username
  password: process.env.DB_PASS,    // Database password
  database: process.env.DB_NAME,    // Database name
  dialect: process.env.DB_DIALECT,  // Dialect (e.g., postgres)
  logging: false,                   // Optional: disable logging
});

module.exports = sequelize;
