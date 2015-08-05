var express = require("express");
var router = express.Router();
var NeDB = require("nedb");
var session = require("express-session");
var u2f = require("u2f");

router.get("/", function (req, res, next)
{
    db.find({username: req.session.username}, function (err, docs)
    {
        if (!req.session.isAuthenticated && docs.length === 1)
        {
            req.session.authRequest = u2f.request("hipstr", docs[0].keyHandle);
            res.render("yubikey");
        }
        else
            res.redirect("/?error=1");
    });
});

router.post("/", function (req, res, next)
{
    db.find({username: req.session.username}, function (err, docs)
    {
        if (!req.session.isAuthenticated && docs.length === 1)
        {
            var checkResponse = u2f.checkSignature(req.session.authRequest, res, docs[0].publicKey);

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