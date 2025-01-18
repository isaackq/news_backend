const sequalize = require("../config/database");
const Category = require("../models/categories");
const News = require("../models/news");
// const Task = require("../models/Tasks");
// const Student = require("../models/students");
// const Authorize = require("../vendor/Auth/Authorize");

module.exports = class Migration {
  //الغرض من الملف تسلسل التنفيذ لحل مشكلة  اسبقية انشاء الاوبجكت عشان  نحل مشكلة الاووث
  sync() {
    //الداتا بيز لازم تكون موجودة قبل البروجكت يعني قبل منعطي سلف للبروجكت
    this.#relations();
    // this.#authorization();
    sequalize
    .sync({ force: false }) //السينك وظيفتها عدم حذف الجداول بس بنضبف عليها عادي
    .then(() => {
        console.log("Synced Successfully");
      })
      .catch(() => {
        console.log("Error Occured"); //خطأ في بنية الجداول في السينتكس
      });
  }

  #relations() {

    Category.hasMany(News, {
      foreignKey: "Category_id",
      onDelete: "RESTRICT",
    }); 

    News.belongsTo(Category, {
      foreignKey: "Category_id",
      onDelete: "RESTRICT",
    });
  }

  #authorization() {
    //شغال على مبدا البروتو تايب وهو اسلوب يستخدم لعملية الانجكشن على مستوى الاوبجكت ولكن من خلال الكلاس يعني بنضيف على الكلاس شغلات من خلال بروتو تايب اوف كلاس مشابه للاقريقيشن فنكشنز تبعت السيكوالايز
    Authorize.getInstance().defineAuthorization(Student); //بنضيف المودلز حسب الحاجة للاوثورايزيشن
  }
};
