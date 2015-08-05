var express = require("express");
var router = express.Router();
var NeDB = require("nedb");

router.get("/", function (req, res, next)
{
    res.render("index", {
        error:           req.query.error,
        username:        req.session.username,
        isAuthenticated: req.session.isAuthenticated
    });
});

router.post("/", function (req, res, next)
{
    var username = req.body.username;
    var password = req.body.password;
    var db = new NeDB({filename: 'data/data.db', autoload: true});

    db.findOne({username: username, password: password}, function (err, doc)
    {
        if (doc)
        {
            req.session.username = doc.username;

            if (doc.useYubiKey)
            {
                req.session.isAuthenticated = false;
                res.redirect('/yubikey');
            }
            else
            {
                req.session.isAuthenticated = true;
                res.redirect('/');
            }
        }
        else
        {
            res.redirect('/?error=1');
        }
    });
});

module.exports = router;
