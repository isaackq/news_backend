exports.guest = (req, res, next) => {
    // if ("isAuthenticated" in req.session) {
    //     if (req.session.isAuthenticated) {
    //     res.redirect("/cms/news");//ازا كان اوثونتيكيتد وديه على الهوم وازا لا رجعو 
    //     }
    //   }
    //  next();
    next();
}