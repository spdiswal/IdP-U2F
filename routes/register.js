var express = require("express");
var NeDB = require("nedb");
var router = express.Router();

/* Registering new user. */
router.get("/", function (req, res, next)
{
    if (req.session.isAuthenticated)
        res.redirect("/");
    else
        res.render("register", {error: req.query.error});
});

router.post("/", function (req, res, next)
{
    if (req.session.isAuthenticated)
        res.redirect("/");
    else
    {
        var username = req.body.username;
        var password = req.body.password;
        var repeatPassword = req.body.repeatPassword;
        var db = new NeDB({filename: 'data/data.db', autoload: true});

        db.find({username: username}, function (err, docs)
        {
            if (docs.length > 0)
                res.redirect('/register?error=2');
            else
            {
                if (password == repeatPassword)
                {
                    db.insert({username: username, password: password, useYubiKey: false}, function ()
                    {
                        req.session.username = username;
                        req.session.isAuthenticated = true;
                        res.redirect("/");
                    });
                }
                else
                    res.redirect("/register?error=1");
            }
        });
    }
});

module.exports = router;
