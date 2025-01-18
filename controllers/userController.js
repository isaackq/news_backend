const User = require("../models/user");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

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
  let result = await User.findAll();
  res.send({ data: result })
    // res.render("layouts/user/read", {
    //     title: "ALL Students",
    //     data: result,
    //   });
};

exports.show = async (req, res, next) => {};

exports.create = (req, res, next) => {
  res.render("layouts/user/create", {
    title: "Create User",
  });
};

exports.store = async (req, res, next) => {
  let error = validationResult(req);
  if (error.isEmpty()) {
    try {
      let user = await User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      }); //صح بس  الباسورد لازمها تشفير
        res.status(201).send({ status: true});
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
    res.status(201).send({ status: false,old:req.body, errors:error.array() });
  }
};

exports.edit = (req, res, next) => {
  
};

exports.update = async (req, res, next) => {};

exports.destroy = async (req, res) => {
  let result = await User.destroy({
    where: { id: req.params.id },
    force: true,
  });
     res.send({status : true , /*result: result */})
    // res.redirect("/cms/user");
};

exports.softDelete = async (req, res) => {};

exports.restore = async (req, res) => {};
