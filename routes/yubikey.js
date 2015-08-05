var express = require("express");
var router = express.Router();
var NeDB = require("nedb");
var u2f = require("u2f");

var appId = "https://localhost:3000";

router.get("/", function (req, res, next)
{
    var db = new NeDB({filename: 'data/data.db', autoload: true});

    db.findOne({username: req.session.username}, function (err, doc)
    {
        if (!req.session.isAuthenticated && doc)
        {
            var u2fRequest = u2f.request(appId, doc.keyHandle);
            req.session.u2fRequest = u2fRequest;
            res.render("yubikey", {u2freq: JSON.stringify(u2fRequest)});
        }
        else
            res.redirect("/?error=1");
    });
});

router.post("/", function (req, res, next)
{
    var db = new NeDB({filename: 'data/data.db', autoload: true});
    db.findOne({username: req.session.username}, function (err, doc)
    {
        if (!req.session.isAuthenticated && doc)
        {
            var checkResponse = u2f.checkSignature(req.session.u2fRequest, req.body, doc.publicKey);

            if (checkResponse.successful)
            {
                req.session.isAuthenticated = true;
                res.redirect("/");
            }
            else
                res.redirect("/?error=2");
        }
        else
            res.redirect("/?error=1");
    });
});

module.exports = router;