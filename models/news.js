// const DataTypes = require("sequelize"); //من غير ديستركتشر عشان نجيب الاوبجكت العام من السيكوالايز
const { DataTypes } = require("sequelize");
const sequalize = require("../config/database");
// const Authorize = require("../vendor/Auth/Authorize");

//اسم المودل لازم يكون مفرد عن اسم الجدول
const News = sequalize.define(
  "news",
  {
    id: {
      type: DataTypes.BIGINT({ zerofill: false, unsigned: true }),
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    PublicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Content: {
      type: DataTypes.STRING(500),
    },
    SideWidget: {
        type: DataTypes.STRING(100),
      },

  },
  {
    timestamps: true,
    paranoid: false,
  }
);

module.exports = News;
