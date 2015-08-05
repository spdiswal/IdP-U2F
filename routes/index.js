var express = require("express");
var router = express.Router();
var NeDB = require("nedb");
var session = require('express-session');

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

    db.find({username: username, password: password}, function(err, docs)
    {
        console.log(JSON.stringify(docs));
        if(docs)
        {
            req.session.username = username;
            res.redirect('/manage');
        }
        else
        {
            res.redirect('/?error=1');
        }
    });
});

module.exports = router;

//router.post("/", function (req, res, next)
//{
//    //console.log(req.body.username);
//    //console.log(req.body.password);
//    res.redirect("/");
//});
