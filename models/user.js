// const DataTypes = require("sequelize"); //من غير ديستركتشر عشان نجيب الاوبجكت العام من السيكوالايز
const { DataTypes } = require("sequelize");
const sequalize = require("../config/database");
// const Authorize = require("../vendor/Auth/Authorize");

//اسم المودل لازم يكون مفرد عن اسم الجدول
const User = sequalize.define(
  "user",
  {
    id: {
      //قيمة رقمية موجبة تبدا من الرقم واحد تزداد زيادة نلقائية  و بتتكررش
      type: DataTypes.BIGINT({ zerofill: false, unsigned: true }),
      primaryKey: true,
      autoIncrement: true,

    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.get("firstName") + " " + this.get("lastName");
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: "Email already used , use another" },
      validate: {
        notEmpty: { msg: "Email value cant be empty" },
        isEmail: { msg: "Enter correct email address" },
        notNull: { msg: "Email can't be null" },
        abc() {
          let result = this.get("email").length < 3;
          if (result) throw new Error("Custom error message");
        },
      },
    },
    gender: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,

      get() {
        return this.getDataValue("gender") === "M" ? "Male" : "Female";
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",

    paranoid: false,
  }
);

module.exports = User;
