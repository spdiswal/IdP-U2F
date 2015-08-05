var express = require("express");
var router = express.Router();

/* Show page for signing in. */
router.get("/", function (req, res, next)
{
    res.render("index", {title: "Awesomeness!"});
});

module.exports = router;

//router.post("/", function (req, res, next)
//{
//    //console.log(req.body.username);
//    //console.log(req.body.password);
//    res.redirect("/");
//});
