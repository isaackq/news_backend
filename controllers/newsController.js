const { Op } = require("sequelize");
// const { validationResult } = require("express-validator");
const News = require("../models/news");
const Category = require("../models/categories");
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
  let localNews = await Category.findAll({
    include: [{ model: News, required: true }],
    where: { name: "localNews" },
  });
  let sportsNews = await Category.findAll({
    include: [{ model: News, required: true }],
    where: { name: "sportsNews" },
  });
  let internationalNews = await Category.findAll({
    include: [{ model: News, required: true }],
    where: { name: "internationalNews" },
  });

  // req.headers.accept === "application/json"
  // ? res.send({status : true ,localNews:localNews ,sportsNews:sportsNews[0].news , internationalNews:internationalNews[0].news, titel : "news"})
  // : res.render("layouts/index", {
  //   guard : req.session.guard ,
  //   titel : "news",
  //   localNews: localNews,
  //   sportsNews: sportsNews,
  //   internationalNews: internationalNews,
  // });
  res.send({status : true ,localNews:localNews ,sportsNews:sportsNews , internationalNews:internationalNews, titel : "news"})
};

exports.show = async (req, res, next) => {
  let result = await News.findOne({
    where: { id: req.params.id },
    include: [{ model: Category }],
  });

  res.send({data: result})
  // res.render("layouts/newsdetailes",{data : result})
  // if (result) {
  //   return res.send({ status: true, result: result });
  // } else {
  //   return res.send({ status: false, message: "news not found" });
  // }
};


exports.create = (req, res, next) => {
  res.render("layouts/news/create", {
    title: "Create Admin",
  });
};

exports.store = async (req, res, next) => {
  let error = validationResult(req);
  if (error.isEmpty()) {
    try {
      let result = await News.create(req.body); //صح بس  الباسورد لازمها تشفير
      console.log(result);
      
        res.status(201).send({ status: true, message:"Created Successfully" })
        // : res.with("message", "Created Successfully").redirect("/cms/news/create");
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
    res.send({old : req.pody ,errors :error.array(),message:"not created"})
    // res
    //   .with("old", req.body)
    //   .with("errors", error.array())
    //   .redirect("/cms/news/create"); //لما نعمل ريداركت بنكون مسحنا كل اشي من الريسبونس
  }
};

exports.edit = (req, res, next) => {};

exports.update = async (req, res, next) => {};

exports.destroy = async (req, res) => {};

exports.softDelete = async (req, res) => {};

exports.restore = async (req, res) => {};
