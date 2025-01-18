const express = require("express");
const usersRouter = require("./routes/wep");
const AppProvider = require("./services/AppProvider");
const { sessionErorrs } = require("./middlewares/session-errors");
const { withSessionHandler } = require("./middlewares/wIthSessionHandller");
const { methodOverride } = require("./middlewares/methodOverride");
const cors = require("cors");
const session = require("express-session");
const app = express();
// const Admin = require("./models/admin");
// const User = require("./models/user");

// console.log(Admin);
// console.log(User);

AppProvider.instance.app = app; //after singleton
AppProvider.instance.syncDatabase();



app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend's URL
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if HTTPS
      sameSite: 'none',
    },
  })
);


// // view engine setup
app.set("views", "views");
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static("public"));

app.use(methodOverride);
app.use(withSessionHandler);
app.use(sessionErorrs);

// Creating a Date object
// const dateObj = new Date();
// Printing the date and time parts
// console.log(`Date: ${dateObj.toDateString()}`);
// console.log(`Time: ${dateObj.toTimeString()}`);

app.use("/cms", usersRouter);

// app.get("/set-session", (req, res) => {
//   req.session.guard = "testGuard";
//   res.send("Session value set");
// });

// app.get("/get-session", (req, res) => {
//   res.send(req.session.guard || "No session value found");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({ status: false, message: "404 not found " });
});

app.listen(5000, (req, res, next) => {
  console.log("Server started at port 5000");
});

module.exports = app;
