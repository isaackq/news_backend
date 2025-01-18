const { Sequelize, DataTypes } = require("sequelize");
const sequalize = require("../config/database");

const Category = sequalize.define(
  "Categories",
  {
    id: {
      type: DataTypes.BIGINT({ zerofill: false, unsigned: true }),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: false,
  }
);

module.exports = Category;
