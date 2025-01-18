// const bcrypt = require("bcrypt");
// const Student = require("../../models/students");
const { validationResult } = require("express-validator");
const Auth = require("../../services/Authenticate");
// const Auth = require("../../services/Authenticate");

exports.showlogin = (req, res, next) => {
  const validator = validationResult(req);
  if (validator.isEmpty()) {
    req.session.guard = req.params.guard;
    req.session.save();
    console.log(req.session);
    res.send({ title: "log in", guard: req.params.guard });
  } else {
    throw new Error("INVALID URL"); //وبخلي الجينيرال هاندرلر يهندل الايرور
  }
};

exports.showSignUp = (req, res, next) => {
  const validator = validationResult(req);
  if (validator.isEmpty()) {
    req.session.guard = req.params.guard;
    res.send({ title: "Sign Up", guard: req.params.guard });
  } else {
    throw new Error("INVALID URL"); //وبخلي الجينيرال هاندرلر يهندل الايرور
  }
};

exports.login = async (req, res, next) => {
  console.log(req.session);

  console.log("xxxxxxxxxx", req.session.guard);
  const validator = validationResult(req);
  if (validator.isEmpty()) {
    console.log("//////////// ", req.session.guard);
    let result = await Auth.guard(req.params.guard).attempt(req);
    console.log(result);
    
    if (result) {
      // return  res.redirect("/cms/news");
      res.send({data:true});
    } else {
      return res.send({ errors: [{ msg: "Wrong credentials" }], old: req.body });
      // return res
      //   .with("errors", [{ msg: "Wrong credentials" }])
      //   .with("old", req.body)
      //   .redirect(`/cms/${req.session.guard}/login`);
    }
  } else {
    // return res
    //   .with("errors", validator.array())
    //   .with("old", req.body)
    //   .redirect(`/cms/user/login`);

    return res.send({ errors: validator.array(), old: req.body });
  }
};

exports.logout = (req, res, next) => {
  //Auth.guard('Student').logout();
  req.session.user = undefined;
  req.session.isAuthenticated = undefined;
  res.redirect(`/cms/${req.session.guard}/login`);
};
exports.forgotpassword = (req, res, next) => {};
exports.editpassword = (req, res, next) => {};
exports.updatepassword = (req, res, next) => {};
