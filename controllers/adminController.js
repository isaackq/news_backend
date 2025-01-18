const { validationResult } = require("express-validator");
const Admin = require("../models/admin");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");

// const { validationResult } = require("express-validator");

/**
 * Has many
 * - getTasks()
 * - countTasks()
 * - hasTasks()
 * - addTasks()
 * - createTasks()
 * - removeTasks()
 */

exports.index = async (req, res) => {
  let result = await Admin.findAll();
    res.send({ data: result })
    //  res.render("layouts/admin/read", {
    //     title: "ALL Admins",
    //     data: result,
    //   });
};

exports.show = async (req, res, next) => {};

exports.create = (req, res, next) => {
  res.render("layouts/admin/create", {
    title: "Create Admin",
  });
};

exports.store = async (req, res, next) => {
  let error = validationResult(req);
  if (error.isEmpty()) {
    try {
      let result = await Admin.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      }); //صح بس  الباسورد لازمها تشفير
      res.status(201).send({ status: true });
    } catch (error) {
      res.status(400).send({
        status: false,
        error:
          Object.keys(error).length > 0
            ? error.errors[0].message
            : "Somthing went wrong",
      });
    } //ضرورية عشان نتعامل مع الابجكت لما يكون فاضي
  } else {
    res
      .status(201)
      .send({ status: false, old: req.body, errors: error.array() });
  }
};

exports.edit = (req, res, next) => {};

exports.update = async (req, res, next) => {};

exports.destroy = async (req, res) => {
  let result = await Admin.destroy({
    where: { id: req.params.id },
    force: true,
  });
  req.headers.accept === "application/json"
    ? res.send({ result: result })
    : res.redirect("/cms/admin");
};

exports.softDelete = async (req, res) => {};

exports.restore = async (req, res) => {};
