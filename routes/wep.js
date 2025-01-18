const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const newsController = require("../controllers/newsController");
const categoryController = require("../controllers/categoryController");
const AuthController = require("../controllers/Auth/AuthController");
const AdminController = require("../controllers/adminController");
const DashboardController = require("../controllers/DashboardController");
const { body, param } = require("express-validator");
const User = require("../models/user");
const { guest } = require("../middlewares/guest");
const Admin = require("../models/admin");
const { authenticate } = require("../middlewares/authenticate");
const { adminAcces } = require("../middlewares/adminAcces");




// router.get("/set-session", (req, res) => {
//   req.session.guard = "testGuard"; // تعيين قيمة للجلسة
//   req.session.save((err) => {
//     if (err) {
//       console.error("Error saving session:", err);
//       return res.status(500).send("Failed to save session");
//     }
//     res.send({ message: "Session saved" });
//   });

  
// });

// // مسار للتحقق من الجلسة
// router.get("/get-session", (req, res) => {
//   res.send({ guard: req.session.guard || "No session found" });
// });


router.get(
  "/:guard/login",
  [
    param("guard")
      .isString() //هالك
      .custom((value) => {
        return value === "admin" || value === "user";
      }),
  ],
  guest,
  AuthController.showlogin
);

router.get(
  "/:guard/SignUP",
  [
    param("guard")
      .isString() //هالك
      .custom((value) => {
        return value === "user";
      }),
  ],
  guest,
  AuthController.showSignUp
);

// router.get("/SignUp",(req, res , next)=>{
//   res.render("/layouts/auth/SignUP.ejs")
// });

router.get("/admin/home", authenticate, DashboardController.home);

router.post(
  "/:guard/login",
  guest,
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        console.log("+++++++++++++--", req.params.guard);
        if (req.params.guard === "admin") {
          return Admin.count({ where: { email: value } }).then((count) => {
            if (count == 0) return Promise.reject("Email is not registerd");
          });
        } else if (req.params.guard === "user") {
          return User.count({ where: { email: value } }).then((count) => {
            if (count == 0) return Promise.reject("Email is not registerd");
          });
        }
      }),
    body("password").trim().notEmpty(),
  ],
  AuthController.login
);

router.get("/logout", authenticate, AuthController.logout);

router.get("/admin", adminAcces, AdminController.index);
router.get("/admin/create", adminAcces, AdminController.create); //عرض واجهة الانشاء
router.get("/admin/:id", adminAcces, AdminController.show);
router.get("/admin/:id/edit", adminAcces, AdminController.edit);
router.post(
  "/admin",
  adminAcces,
  [
    body("firstName")
      .trim()
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage("Cheak first name"),
    body("email")
      .trim()
      .isEmail()
      .custom(async (value) => {
        let count = await Admin.count({ where: { email: value } });
        if (count > 0) {
          return Promise.reject("E_mail is aldeady used , use another one ");
        }
      }),
  ],
  AdminController.store
);
router.put("/admin/:id", adminAcces, AdminController.update);
router.delete("/admin/:id", adminAcces, AdminController.destroy);

router.get("/news", authenticate, newsController.index);
router.get("/news/create", authenticate, adminAcces, newsController.create); //عرض واجهة الانشاء
router.get("/news/:id", authenticate, newsController.show);
router.get("/news/:id/edit", adminAcces, newsController.edit);
router.post("/news", authenticate, [body()], adminAcces, newsController.store);
router.put("/news/:id", authenticate, adminAcces, newsController.update);
router.delete("/news/:id", authenticate, adminAcces, newsController.destroy);

router.get("/category", categoryController.index);
router.get("/category/create", adminAcces, categoryController.create); //عرض واجهة الانشاء
router.get("/category/:id", categoryController.show);
router.get("/category/:id/edit", adminAcces, categoryController.edit);
router.post("/category", adminAcces, categoryController.store);
router.put("/category/:id", adminAcces, categoryController.update);
router.delete("/category/:id", adminAcces, categoryController.destroy);

router.get("/user", adminAcces, userController.index);
router.get("/user/create", adminAcces, userController.create); //عرض واجهة الانشاء
router.get("/user/:id", adminAcces, userController.show);
router.get("/user/:id/edit", adminAcces, userController.edit);
router.post(
  "/user",
  [
    body("firstName")
      .trim()
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage("Cheak first name"),
    body("email")
      .trim()
      .isEmail()
      .custom(async (value) => {
        let count = await User.count({ where: { email: value } });
        if (count > 0) {
          return Promise.reject("E_mail is aldeady used , use another one ");
        }
      }),
  ],
  userController.store
); //بلزمها ادمن اكسس ولا لا ؟  // بلزمهاش لاني مش راح اصل لالها غير من فورم لانو هيا بوست اصلا وفش فيها ريدندر
router.put("/user/:id", adminAcces, userController.update);
router.delete("/user/:id", adminAcces, userController.destroy);

module.exports = router;
