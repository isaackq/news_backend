

const Admin = require("../models/admin");
const User = require("../models/user");

exports.auth = {
  defaults: {
    guard: "user",
  },
  guards: {
    user: {
      driver: "session", 
      provider: "useres",
    },
    admin :{
        driver:"session" ,
        provider :"admins"
    } 
  },
    providers : {
    //data sourse
    useres : {
      // modelname:"Student",
      model: User,
      driver: "Sequelize",
    },
    admins:{//لو  كنا بنشتغل داتا بيز
      model: Admin,
        driver: "Sequelize"
    }
  },
};

//هادا الشغل بسهل علينا عملية اضافة اي مستخدم اخر بس بنضيف غارد وبروفايدر
