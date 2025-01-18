// import sequalize from "sequalize";
// const sequalize = require("sequalize");
const { Sequelize } = require("sequelize");

const sequalize = new Sequelize({
  host: "localhost",
  port : 3308,//عشان التعارض مع الوامب 
  username: "root",
  password: "",
  database : "distributed",
  dialect : "mysql"//نوع الداتا بيز الي بدي اتصل عليها 
});

module.exports = sequalize;
