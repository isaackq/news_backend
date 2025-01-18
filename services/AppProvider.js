const Migration = require("../database/migration");

module.exports = class AppProvider {//بدنا نحولو سينغلتون
 /* static*/ #app = null;
  #migration = null ;

    static #instance = null;

  static get instance() {//ممكن نعمل هان عمليات كتير مثلا انو نستدعي المايقريشنز
    return (this.#instance ??= new AppProvider());
  }
  //بدنا نعمل ملف لما نستدعيه ينفذ اكتر من اشي يعني ينفذ المايقريشنز واي اشي تاني 
  syncDatabase(){
    this.migration= new Migration();
    this.migration.sync();
  }


 /* static*/ set app(app) {
    this.#app = app;
  }

  /*static*/ get router(){
    return this.#app.router.stack;
  }

 


 
};
