var express = require("express");
var router = express.Router();
var NeDB = require("nedb");

/* Show page for signing in. */
router.get("/", function (req, res, next)
{
    res.render("index", {title: "Awesomeness!"});
});

router.post("/", function (req, res, next)
{
    var username = req.body.username;
    var password = req.body.password;
    var db = new NeDB({ filename: 'data/data.db', autoload: true});
    db.insert({username: 'alan', password: 'turing'}, function(err, newDoc)
    {
        console.log(JSON.stringify(newDoc));
    });

    res.redirect('/');
});

module.exports = router;

//router.post("/", function (req, res, next)
//{
//    //console.log(req.body.username);
//    //console.log(req.body.password);
//    res.redirect("/");
//});
