var express = require("express");
var u2f = require('u2f');
var router = express.Router();

/* Managing YubiKey devices. */
router.get("/", function (req, res, next)
{
    var u2fReq = u2f.request("http://localhost:3000", 'test');
    req.session.authRequest = u2fReq;

    if(req.session.username)
        res.render("manage", {username: req.session.username, u2freq: JSON.stringify(u2fReq)});
    else
        res.render("manage", {error: 1, u2freq: JSON.stringify(u2fReq)});
});

module.exports = router;
