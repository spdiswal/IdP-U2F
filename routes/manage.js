var express = require("express");
var router = express.Router();
var NeDB = require("nedb");
var u2f = require('u2f');

var appId = "https://localhost:3000";

router.get("/", function (req, res, next)
{
    var u2fRequest = u2f.request(appId);
    req.session.u2fRequest = u2fRequest;

    res.render("manage", {
        error:           req.query.error,
        username:        req.session.username,
        isAuthenticated: req.session.isAuthenticated,
        u2freq:          JSON.stringify(u2fRequest)
    });
});

router.post("/", function (req, res, next)
{
    var registration = u2f.checkRegistration(req.session.u2fRequest, req.body);

    if (registration.successful && req.session.isAuthenticated)
    {
        var db = new NeDB({filename: 'data/data.db', autoload: true});

        db.update({username: req.session.username}, {
            $set: {
                keyHandle:  registration.keyHandle,
                publicKey:  registration.publicKey,
                useYubiKey: true
            }
        }, {}, function (err, numReplaced)
        {
            res.sendStatus(numReplaced === 1 ? 200 : 500);
        });
    }
    else
        res.sendStatus(500);
});

module.exports = router;
