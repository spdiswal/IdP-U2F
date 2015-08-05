var express = require("express");
var router = express.Router();

/* Managing YubiKey devices. */
router.get("/", function (req, res, next)
{
    if(req.session.username)
        res.render("manage", {username: req.session.username});
    else
        res.redirect('/?error=1');
});

module.exports = router;
