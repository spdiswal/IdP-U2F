var express = require("express");
var router = express.Router();

/* Registering new user. */
router.get("/", function (req, res, next)
{
    res.render("register");
});

module.exports = router;
