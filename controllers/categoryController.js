const { Op } = require("sequelize");
// const { validationResult } = require("express-validator");
const News = require("../models/news");
const Category = require("../models/categories");
const { render } = require("ejs");

/**
 * Has many
 * - getTasks()
 * - countTasks()
 * - hasTasks()
 * - addTasks()
 * - createTasks()
 * - removeTasks()
 */

exports.index = async (req, res) => {};

exports.show = async (req, res, next) => {
  let result = await Category.findOne({
    where: { id: req.params.id },
    include: { model: News, required: true },
  });
  console.log("aaaaaaaaaaaaaaaaaaaa", result);

  res.send({ data: result });
  //  res.render("layouts/all-news",{data: result})
};

exports.create = (req, res, next) => {};

exports.store = async (req, res, next) => {
  let result = await News.create(req.body);
  res.send({ status: true, result: result });
};

exports.edit = (req, res, next) => {};

exports.update = async (req, res, next) => {};

exports.destroy = async (req, res) => {};

exports.softDelete = async (req, res) => {};

exports.restore = async (req, res) => {};
